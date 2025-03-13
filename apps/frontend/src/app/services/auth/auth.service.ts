import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { env } from 'apps/frontend/src/env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  login = () => (window.location.href = `${env.api}/auth`);

  logout = () =>
    this.httpClient
      .delete(`${env.api}/auth/logout`, {
        withCredentials: true,
      })
      .subscribe(() => this.router.navigate(['/login']));
  isAuthenticated = () =>
    this.httpClient.get<{ authenticated: boolean }>(
      `${env.api}/auth/status`,
      { withCredentials: true }
    );
}
