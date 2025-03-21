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
    { name: 'Event 1', date: '2023-10-01', location: 'Rotkreuz 9 Stock', time: '10:00 Uhr' },
    { name: 'Event 2', date: '2023-10-01', location: 'Rotkreuz 9 Stock', time: '10:00 Uhr' },
    { name: 'Event 3', date: '2023-10-01', location: 'Rotkreuz 9 Stock', time: '10:00 Uhr' },
   
   
  ]);
}
