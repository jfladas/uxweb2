import { Component, inject, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleMapsModule, MapAdvancedMarker, MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { forkJoin, map, mergeMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { EventItemComponent } from '../event-item/event-item.component';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { PopoverComponent } from '../popover/popover.component';
import { EventListComponent } from '../event-list/event-list.component';
import { EventService } from '../../services/event.service';
import { selectEvents } from '../../+store/events/evnets.selector';
import { EventsActions } from '../../+store/events/events.action';
import { Event } from '../../models/event.model';

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
    EventItemComponent,
    EventListComponent,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  private sanitizer = inject(DomSanitizer);
  private eventService = inject(EventService);
  private store$ = inject(Store<'events'>);
  constructor(private geoCoder: MapGeocoder) {}

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;
  @ViewChild(SubscribeButtonComponent) subscribeButton?: SubscribeButtonComponent;

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

  events$ = this.store$.select(selectEvents).pipe(
    map(events => {
      const grouped: Record<string, Event[]> = {};
      events.forEach(event => {
        const date = new Date(event.start);
        const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          ...event,
          id: event.id?.toString(),
          name: event.summary,
          date: event.start.split('T')[0],
          time: event.start.split('T')[1]?.substring(0, 5),
          by: event.by || 'HSLU',
          poster: event.poster || '',
        });
      });
      return grouped;
    })
  );

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
      mergeMap((events) => forkJoin(events.map((event) => this.geoCode(event.location || '')))),
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
      by: 'HSLU',
      poster: '',
    };

    this.store$.dispatch(EventsActions.saveEvent({ event: baseEvent }));
  };

  timestamp = (time?: string) => `${this.eventForm.value.datum}T${time}`;
  loadEvents = () => this.store$.dispatch(EventsActions.loadEvents());

  isCurrentYear(year: string | null): boolean {
    return year ? parseInt(year, 10) === this.currentYear : false;
  }

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
        this.showPopover('Juhuu! Der Event wurde erfolgreich zu deinem Kalender hinzugefügt!', 'event_available', false, []);
        break;
      case 'confirm-subscribe':
        this.showPopover('Juhuu! Die Events wurden erfolgreich zu deinem Kalender hinzugefügt!', 'event_available', false, []);
        this.subscribeButton?.markAsSubscribed();
        break;
      case 'confirm-delete':
        this.showPopover('Der Event wurde erfolgreich gelöscht!', 'check_circle', false, []);
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

  onFavoriteChange(event: { id: string; isFavorite: boolean }): void {
    this.store$.select(selectEvents).pipe(take(1)).subscribe((events) => {
      const targetEvent = events.find((e) => e.id?.toString() === event.id);
      if (targetEvent) {
        this.store$.dispatch(
          EventsActions.updateFavorite({
            eventId: event.id,
            isFavorite: event.isFavorite,
          })
        );
      }
    });
  }
}
