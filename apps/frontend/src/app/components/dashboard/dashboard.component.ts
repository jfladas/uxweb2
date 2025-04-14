import { CommonModule, registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

registerLocaleData(localeDeCh);
import { LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchComponent } from '../search/search.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapGeocoder,
  MapGeocoderResponse,
} from '@angular/google-maps';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { forkJoin, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

import { EventsActions } from '../../+store/events/events.action';
import { selectEvents } from '../../+store/events/evnets.selector';
import { EventListComponent } from '../event-list/event-list.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { PopoverComponent } from '../popover/popover.component';
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  private store$ = inject(Store<'events'>);
  constructor(private geoCoder: MapGeocoder, private router: Router) {}

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;
  @ViewChild(SubscribeButtonComponent)
  subscribeButton?: SubscribeButtonComponent;

  center?: google.maps.LatLng;
  zoom = 8;
  markers: any[] = [];
  iframeSrc: SafeResourceUrl = '';
  activeFilters: string[] = [];

  popoverVisible = false;
  popoverText = '';
  popoverIcon?: string;
  popoverButtons: { label: string; action: string }[] = [];
  popoverCloseable = true;

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

  loadEvents = () => this.store$.dispatch(EventsActions.loadEvents());

  handlePopoverAction(action: string): void {
    console.log('Popover action:', action);
    setTimeout(() => {
      switch (action) {
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
      }
    }, 310);
  }

  onShowPopover(event: {
    text: string;
    icon?: string;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }): void {
    this.showPopover(event.text, event.icon, event.closeable, event.buttons);
  }

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
    if (!this.popoverCloseable) {
      setTimeout(() => {
        this.closePopover();
      }, 1500);
    }
  }

  closePopover(): void {
    this.popoverVisible = false;
  }

  onFiltersChanged(filters: string[]): void {
    this.activeFilters = filters;
  }
}
