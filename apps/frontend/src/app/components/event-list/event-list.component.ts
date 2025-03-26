import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { EventItemComponent } from '../event-item/event-item.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [CommonModule, EventItemComponent], // ⬅️ EventItemComponent eingebunden
})
export class EventListComponent implements OnInit {
  events: {
    name: string;
    date: string;
    time: string;
    location: string;
  }[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('📦 Rohe Event-Daten vom Backend:', data);
        this.events = data.map((event) => ({
          name: event.summary,
          location: event.location || '',
          description: event.location || '',
          date: event.start.split('T')[0], // "2025-04-15"
          time: event.start.split('T')[1].slice(0, 5), // "14:00"
        }));
        console.log('🧾 Umgewandelte Event-Daten:', this.events);
      },
      error: (error) => {
        console.error('❌ Fehler beim Laden der Events:', error);
      }
    });
  }
  
}
