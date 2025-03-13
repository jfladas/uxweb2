import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from 'apps/frontend/src/env/env';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private httpClient = inject(HttpClient);

  api = () =>
    this.httpClient.get<{
      message: string;
    }>(`${env.api}`);
}
