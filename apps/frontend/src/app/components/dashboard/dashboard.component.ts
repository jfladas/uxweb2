import { CommonModule, registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { Component, inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapGeocoder,
  MapGeocoderResponse,
} from '@angular/google-maps';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

import { EventsActions } from '../../+store/events/events.action';
import { selectEvents } from '../../+store/events/evnets.selector';
import { Event } from '../../models/event.model';
import { EventListComponent } from '../event-list/event-list.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { PopoverComponent } from '../popover/popover.component';
import { SearchComponent } from '../search/search.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';

registerLocaleData(localeDeCh);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    PopoverComponent,
    EventListComponent,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  private store$ = inject(Store<'events'>);
  constructor(private geoCoder: MapGeocoder) {}

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;
  @ViewChild(SubscribeButtonComponent)
  subscribeButton?: SubscribeButtonComponent;

  center?: google.maps.LatLng;
  zoom = 8;
  markers: any[] = [];
  iframeSrc: SafeResourceUrl = '';

  eventForm = new FormGroup({
    titel: new FormControl(''),
    ort: new FormControl(''),
    datum: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
  });

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
      map((response: MapGeocoderResponse) =>
        response.results.length > 0
          ? ({
              position: {
                lat: response.results[0].geometry.location.lat(),
                lng: response.results[0].geometry.location.lng(),
              },
            } as MapAdvancedMarker)
          : null
      )
    );

  marker$: Observable<MapAdvancedMarker[]> = this.store$
    .select(selectEvents)
    .pipe(
      mergeMap((events) =>
        forkJoin(events.map((event) => this.geoCode(event.location || '')))
      ),
      map((markers) => markers.filter((marker) => marker !== null))
    );

  submit = () => {
    const baseEvent: Event = {
      summary: this.eventForm.value.titel || '',
      location: this.eventForm.value.ort || '',
      start: this.timestamp(this.eventForm.value.start || '00:00'),
      end: this.timestamp(this.eventForm.value.end || '00:00'),
      description: this.eventForm.value.description || '',
      name: this.eventForm.value.titel || '',
      date: this.eventForm.value.datum || '',
      time: this.eventForm.value.start || '',
      by: 'di',
      poster: '',
    };

    this.store$.dispatch(EventsActions.saveEvent({ event: baseEvent }));
  };

  timestamp = (time?: string) => `${this.eventForm.value.datum}T${time}`;
  loadEvents = () => this.store$.dispatch(EventsActions.loadEvents());

  popoverText = '';
  popoverIcon?: string;
  popoverButtons: { label: string; action: string }[] = [];
  popoverCloseable = true;
  popoverVisible = false;

  showPopover(
    text: string,
    icon: string | undefined,
    closeable: boolean,
    buttons: { label: string; action: string }[]
  ): void {
    this.popoverText = text;
    this.popoverIcon = icon;
    this.popoverCloseable = closeable;
    this.popoverButtons = buttons;
    this.popoverVisible = true;
    if (!closeable) {
      setTimeout(() => this.closePopoverWithFadeOut(), 1500);
    }
  }

  handlePopoverAction(action: string): void {
    switch (action) {
      case 'cancel':
        this.closePopoverWithFadeOut();
        break;
      case 'confirm-calendar':
        this.showPopover(
          'Juhuu! Der Event wurde erfolgreich zu deinem Kalender hinzugefügt!',
          'event_available',
          false,
          []
        );
        break;
      case 'confirm-subscribe':
        this.showPopover(
          'Juhuu! Die Events wurden erfolgreich zu deinem Kalender hinzugefügt!',
          'event_available',
          false,
          []
        );
        this.subscribeButton?.markAsSubscribed();
        break;
      case 'confirm-delete':
        this.showPopover(
          'Der Event wurde erfolgreich gelöscht!',
          'check_circle',
          false,
          []
        );
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  handlePopoverClose(): void {
    this.popoverVisible = false;
  }

  closePopoverWithFadeOut(): void {
    if (this.popoverComponent) {
      this.popoverComponent.onClose();
      setTimeout(() => {
        this.popoverVisible = false;
      }, 300);
    }
  }
}
