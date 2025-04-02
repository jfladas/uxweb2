import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { EventListComponent } from '../event-list/event-list.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule, MapAdvancedMarker, MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { filter, forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../+store/events/evnets.selector';
import { EventsActions } from '../../+store/events/events.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    EventListComponent, // ✅ now included
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private store$ = inject(Store<'events'>);
  eventForm = new FormGroup({
    titel: new FormControl(''),
    ort: new FormControl(''),
    datum: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
  });

  events$ = this.store$.select(selectEvents);

  center?: google.maps.LatLng;
  zoom = 8;
  constructor(private geoCoder: MapGeocoder) {}
  ngOnInit(): void {
    this.loadEvents();
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.center = new google.maps.LatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          this.center = new google.maps.LatLng(47.414, 8.0445);
        }
      );
    } else {
      this.center = new google.maps.LatLng(47.414, 8.0445);
    }
  }

  geoCode = (address: string) =>
    this.geoCoder.geocode({ address }).pipe(
      filter((response) => response.results.length > 0),
      map(
        (response: MapGeocoderResponse) =>
          ({
            position: {
              lat: response.results[0].geometry.location.lat(),
              lng: response.results[0].geometry.location.lng(),
            },
          } as MapAdvancedMarker)
      )
    );

  marker$: Observable<MapAdvancedMarker[]> = this.events$.pipe(
    mergeMap((events) => forkJoin(events.map((event) => this.geoCode(event.location))))
  );

  // Submit the event form
  submit = () =>
    this.store$.dispatch(
      EventsActions.saveEvent({
        event: {
          summary: this.eventForm.value.titel || '',
          location: this.eventForm.value.ort || '',
          start: this.timestamp(this.eventForm.value.start || '00:00'),
          end: this.timestamp(this.eventForm.value.end || '00:00'),
          description: this.eventForm.value.description || '',
        },
      })
    );

  timestamp = (time?: string) => `${this.eventForm.value.datum}T${time}`;

  // Load events from the backend and update the iframe with the first event's location
  loadEvents = () => this.store$.dispatch(EventsActions.loadEvents());
}
