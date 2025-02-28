import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private httpClient = inject(HttpClient);

  api = () =>
    this.httpClient.get<{
      message: string;
    }>('http://localhost:3000/api');
}
