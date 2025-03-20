import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { CommonModule } from '@angular/common'; // ✅ Import für *ngFor & DatePipe

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [CommonModule], // ✅ CommonModule importieren, falls nötig
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('❌ Fehler beim Laden der Events:', error);
      }
    });
  }
}
