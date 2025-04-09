import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItemComponent } from '../event-item/event-item.component';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../+store/events/evnets.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [CommonModule, EventItemComponent],
})
export class EventListComponent {
  private store$ = inject(Store<'events'>);
  event$ = this.store$.select(selectEvents).pipe(
    map((events) =>
      events.map((event) => ({
        ...event,
        name: event.summary,
        date: event.start.split('T')[0],
        time: event.start.split('T')[1]?.slice(0, 5),
        by: 'HSLU',
        poster: '',
      }))
    )
  );
}