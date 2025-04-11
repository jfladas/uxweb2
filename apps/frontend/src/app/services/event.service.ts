import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${env.api}/events`;


  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  getEventById(id: number): Observable<Event | undefined> {
    return this.getEvents().pipe(
      map((events) => events.find((event) => event.id === id))
    );
  }
  
}
