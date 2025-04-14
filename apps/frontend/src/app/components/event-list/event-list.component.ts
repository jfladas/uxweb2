import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { EventsActions } from '../../+store/events/events.action';
import { selectEvents } from '../../+store/events/evnets.selector';
import { Event } from '../../models/event.model';
import { EventItemComponent } from '../event-item/event-item.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, EventItemComponent, DatePipe, PopoverComponent],
})
export class EventListComponent {
  private store$ = inject(Store<'events'>);

  @Output() showPopover = new EventEmitter<{
    text: string;
    icon: string | undefined;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }>();

  currentYear = new Date().getFullYear();

  events$ = this.store$.select(selectEvents).pipe(
    map((events) => {
      const grouped: Record<string, Event[]> = {};
      events.forEach((event) => {
        const date = new Date(event.start);
        const key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          ...event,
          id: event.id?.toString(),
          name: event.summary,
          date: event.start.split('T')[0],
          time: event.start.split('T')[1]?.substring(0, 5),
          by: event.by || 'di',
          poster: event.poster || '',
        });
      });
      return grouped;
    })
  );

  popoverVisible = false;
  popoverData: {
    text: string;
    icon?: string;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  } | null = null;

  onFavoriteChange(event: { id: string; isFavorite: boolean }): void {
    this.store$
      .select(selectEvents)
      .pipe(take(1))
      .subscribe((events) => {
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

  isCurrentYear(year: string | null): boolean {
    return year ? parseInt(year, 10) === this.currentYear : false;
  }

  onShowPopover(event: {
    text: string;
    icon?: string;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }): void {
    this.popoverVisible = true;
    this.popoverData = event;
  }

  closePopover(): void {
    this.popoverVisible = false;
    this.popoverData = null;
  }
}
