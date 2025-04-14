import { Component, ViewChild, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

registerLocaleData(localeDeCh);
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { EventItemComponent } from '../event-item/event-item.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-favorites',
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    EventItemComponent,
    PopoverComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  currentYear = new Date().getFullYear();
  events$!: Observable<Record<string, Event[]>>;
  favoriteCount = 0;
  popoverVisible = false;
  popoverText = '';
  popoverIcon?: string;
  popoverButtons: { label: string; action: string }[] = [];
  popoverCloseable = true;

  constructor(private eventService: EventService, private location: Location) {}

  ngOnInit(): void {
    this.updateEvents();
    this.updateFavoriteCount();
  }

  isCurrentYear(year: string | null): boolean {
    if (year === null) {
      return false;
    }
    return parseInt(year, 10) === this.currentYear;
  }

  onFavoriteChange(event: { id: string; isFavorite: boolean }): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      const targetEvent = events.find((e: Event) => e.id === event.id);
      if (targetEvent) {
        targetEvent.favorite = event.isFavorite;
      }
      this.updateEvents();
    });
  }

  updateFavoriteCount(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.favoriteCount = events.filter(
        (event: Event) => event.favorite
      ).length;
    });
  }

  updateEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      const currentDate = new Date();
      const groupedEvents = events
        .filter((event: Event) => event.favorite === true)
        .reduce((acc: Record<string, Event[]>, event: Event) => {
          const date = new Date(event.date);
          if (date >= currentDate) {
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!acc[monthYear]) {
              acc[monthYear] = [];
            }
            acc[monthYear].push(event);
          }
          return acc;
        }, {});
      this.events$ = of(
        Object.keys(groupedEvents)
          .sort()
          .reduce((acc: Record<string, Event[]>, key) => {
            acc[key] = groupedEvents[key];
            return acc;
          }, {})
      );
      this.updateFavoriteCount();
    });
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
  }

  handlePopoverAction(action: string): void {
    console.log('Popover action:', action);
    this.popoverVisible = false;
  }

  closePopover(): void {
    this.popoverVisible = false;
  }

  goBack(): void {
    this.location.back();
  }
}
