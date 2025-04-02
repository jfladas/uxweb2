registerLocaleData(localeDeCh);
import { LOCALE_ID } from '@angular/core';
import { EventItemComponent } from '../event-item/event-item.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { PopoverComponent } from '../popover/popover.component';
import { EventListComponent } from '../event-list/event-list.component'; // 👈 EventList importieren
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { GoogleMapsModule, MapAdvancedMarker, MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { filter, map, mergeAll, mergeMap, Observable, tap, toArray, forkJoin } from 'rxjs';
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
    DatePipe,
    EventItemComponent,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    PopoverComponent,
    EventListComponent, // ✅ now included
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
/*
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  events$!: Observable<Record<string, any[]>>;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = of(this.eventService.getEvents()).pipe(
      map((events) => {
        const currentDate = new Date();
        const groupedEvents = events.reduce(
          (acc: Record<string, any[]>, event) => {
            const date = new Date(event.date);
            if (date >= currentDate) {
              const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
              if (!acc[monthYear]) {
                acc[monthYear] = [];
              }
              acc[monthYear].push(event);
            }
            return acc;
          },
          {}
        );
        return Object.keys(groupedEvents)
          .sort()
          .reduce((acc: Record<string, any[]>, key) => {
            acc[key] = groupedEvents[key];
            return acc;
          }, {});
          */
export class DashboardComponent {

  markers: any[] = []; 
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };

  iframeSrc:SafeResourceUrl = ''; // Property to hold the dynamic iframe source URL

  isCurrentYear(year: string | null): boolean {
    if (year === null) {
      return false;
    }
    //return parseInt(year, 10) === this.currentYear;
    return true;
  }

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;
  @ViewChild(SubscribeButtonComponent)
  subscribeButton?: SubscribeButtonComponent;

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
      setTimeout(() => {
        this.closePopoverWithFadeOut();
      }, 1500);
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
        break;
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
    const targetEvent = this.eventService
      .getEvents()
      .find((e) => e.id === event.id);
    if (targetEvent) {
      targetEvent.favorite = event.isFavorite;
    }
  }

  private sanitzer = inject(DomSanitizer);
  eventservice = inject(EventService);
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

    marker$: Observable<MapAdvancedMarker[]> = this.events$.pipe(
      mergeMap((events) =>
        forkJoin(events.map((event) => this.geoCode(event.location)))
      ),
      map((markers) => markers.filter((marker) => marker !== null))
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
