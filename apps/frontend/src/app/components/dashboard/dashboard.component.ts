import { Component, ViewChild } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

registerLocaleData(localeDeCh);
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventItemComponent } from '../event-item/event-item.component';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    CommonModule,
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
export class DashboardComponent {
  currentYear = new Date().getFullYear();

  events$ = of([
    {
      name: 'DI-Party',
      date: '2025-04-03',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
    },
    {
      name: 'STAIR Event',
      date: '2025-04-24',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
    },
    {
      name: 'FRAME Meetup',
      date: '2025-05-05',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
      poster: 'assets/poster3.jpg',
    },
    {
      name: 'Digital Oddities',
      date: '2025-05-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
    },
    {
      name: 'DI-Party',
      date: '2025-06-03',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
    },
    {
      name: 'STAIR Event',
      date: '2025-06-24',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
      poster: 'assets/poster2.jpg',
    },
    {
      name: 'FRAME Meetup',
      date: '2025-07-05',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
    },
    {
      name: 'Digital Oddities',
      date: '2026-01-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
    },
  ]).pipe(
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

  isCurrentYear(year: string | null): boolean {
    if (year === null) {
      return false;
    }
    return parseInt(year, 10) === this.currentYear;
  }

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;

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
}
