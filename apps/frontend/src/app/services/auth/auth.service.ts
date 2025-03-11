import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  login = () => (window.location.href = `http://localhost:3000/api/auth`);
  logout = () =>
    this.httpClient
      .delete('http://localhost:3000/api/auth/logout', {
        withCredentials: true,
      })
      .subscribe(() => this.router.navigate(['/login']));
  isAuthenticated = () =>
    this.httpClient.get<{ authenticated: boolean }>(
      'http://localhost:3000/api/auth/status',
      { withCredentials: true }
    );
}
