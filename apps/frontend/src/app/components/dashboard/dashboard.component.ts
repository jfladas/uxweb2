import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { EventItemComponent } from '../event-item/event-item.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CommonModule, EventItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  logout = () => this.authService.logout();

  events$ = of([
    { name: 'Event 1', date: '2023-10-01' },
    { name: 'Event 2', date: '2023-10-02' },
    { name: 'Event 3', date: '2023-10-03' },
    { name: 'Event 4', date: '2023-10-04' },
    { name: 'Event 5', date: '2023-10-05' },
  ]);
}
