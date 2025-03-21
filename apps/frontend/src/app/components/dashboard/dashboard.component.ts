import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { EventItemComponent } from '../event-item/event-item.component';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    CommonModule,
    EventItemComponent,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  events$ = of([
    { name: 'Event 1', date: '2023-10-01' },
    { name: 'Event 2', date: '2023-10-02' },
    { name: 'Event 3', date: '2023-10-03' },
    { name: 'Event 4', date: '2023-10-04' },
    { name: 'Event 5', date: '2023-10-05' },
    { name: 'Event 6', date: '2023-10-01' },
    { name: 'Event 7', date: '2023-10-02' },
    { name: 'Event 8', date: '2023-10-03' },
    { name: 'Event 9', date: '2023-10-04' },
    { name: 'Event 10', date: '2023-10-05' },
  ]);
}
