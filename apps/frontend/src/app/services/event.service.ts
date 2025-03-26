import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id?: number;
  summary: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService { // ✅ Ensure this class is correctly defined
  private apiUrl = 'http://localhost:3000/api/events'; // ✅ Correct API URL

  constructor(private http: HttpClient) {} // ✅ Fix constructor issue

  getEvents(): Observable<Event[]> { // ✅ Ensure correct function definition
    return this.http.get<Event[]>(this.apiUrl);
  }

  createEvent(event: Event): Observable<Event> { // ✅ Fix function definition
    return this.http.post<Event>(this.apiUrl, event);
  }
}
