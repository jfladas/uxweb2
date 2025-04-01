import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { EventItemComponent } from '../event-item/event-item.component';
import { selectEvents } from '../../+store/events/evnets.selector';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [CommonModule, EventItemComponent], // ⬅️ EventItemComponent eingebunden
})
export class EventListComponent {
  private store$ = inject(Store<'events'>);
  event$ = this.store$.select(selectEvents).pipe(
    map((events) =>
      events.map((event) => ({
        name: event.summary,
        location: event.location || '',
        description: event.description || '',
        date: event.start.split('T')[0], // "2025-04-15"
        time: event.start.split('T')[1].slice(0, 5), // "14:00"())
      }))
    )
  );
}
