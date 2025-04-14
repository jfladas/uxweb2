import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { EventsActions } from '../../+store/events/events.action';
import { selectEvents } from '../../+store/events/evnets.selector';
import { Event } from '../../models/event.model';
import { EventItemComponent } from '../event-item/event-item.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, EventItemComponent, DatePipe],
})
export class EventListComponent {
  private store$ = inject(Store<'events'>);

  private _activeFilters: string[] = [];
  @Input()
  set activeFilters(filters: string[]) {
    this._activeFilters = filters;
    this.refreshEvents();
  }
  get activeFilters(): string[] {
    return this._activeFilters;
  }

  @Output() showPopover = new EventEmitter<{
    text: string;
    icon?: string | undefined;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }>();

  currentYear = new Date().getFullYear();

  events$ = this.store$.select(selectEvents).pipe(
    map((events) => {
      const grouped: Record<string, Event[]> = {};
      events.forEach((event) => {
        const eventBy = event.by?.toLowerCase() ?? 'di';
        if (
          this.activeFilters.length === 0 ||
          this.activeFilters.includes(eventBy)
        ) {
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
            by: eventBy,
            poster: event.poster || '',
          });
        }
      });
      return grouped;
    })
  );

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
    this.showPopover.emit(event);
  }

  onFiltersChanged(filters: string[]): void {
    this.activeFilters = filters;
    this.refreshEvents();
  }

  private refreshEvents(): void {
    this.events$ = this.store$.select(selectEvents).pipe(
      map((events) => {
        const grouped: Record<string, Event[]> = {};
        events.forEach((event) => {
          const eventBy = event.by?.toLowerCase() ?? 'unknown';
          if (
            this.activeFilters.length === 0 ||
            this.activeFilters.includes(eventBy)
          ) {
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
              by: eventBy,
              poster: event.poster || '',
            });
          }
        });
        return grouped;
      })
    );
  }
}
