import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  logout = () => this.authService.logout();

  helloWorld$ = this.httpClient
    .get<{ authenticated: boolean }>('http://localhost:3000/api/', {
      withCredentials: true,
    })
    .pipe(map((response) => response.authenticated));
}
