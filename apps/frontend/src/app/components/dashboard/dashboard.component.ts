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
    {
      name: 'DI-Party',
      date: '3. April 2025',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
    },
    {
      name: 'STAIR Event',
      date: '24. April 2025',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
      poster: 'assets/poster2.jpg',
    },
    {
      name: 'FRAME Meetup',
      date: '5. Mai 2025',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
      poster: 'assets/poster3.jpg',
    },
    {
      name: 'Digital Oddities',
      date: '14. Mai 2025',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
    },
  ]);
}
