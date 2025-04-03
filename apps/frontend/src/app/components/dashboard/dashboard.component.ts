import { EventListComponent } from '../event-list/event-list.component'; // 👈 EventList importieren
import { Component, ViewChild, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { EventService } from '../../services/event.service'; // Import EventService

registerLocaleData(localeDeCh);
import { CommonModule, DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import Observable
import { map } from 'rxjs/operators';
import { EventItemComponent } from '../event-item/event-item.component';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    EventListComponent, // ✅ jetzt wirklich eingebunden!
    DatePipe,
    EventItemComponent,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    PopoverComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
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
      })
    );
  }

  isCurrentYear(year: string | null): boolean {
    if (year === null) {
      return false;
    }
    return parseInt(year, 10) === this.currentYear;
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
}
