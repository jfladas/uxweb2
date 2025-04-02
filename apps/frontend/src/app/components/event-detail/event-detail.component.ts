import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  eventId!: string;
  eventTitle!: string;
  eventPoster!: string;
  eventLocation!: string;
  eventDate!: string;
  eventTime!: string;
  eventDescription!: string;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    this.fetchEventDetails();
  }

  fetchEventDetails(): void {
    const event = this.eventService.getEventById(this.eventId);
    if (event) {
      this.eventTitle = event.name || 'Unbekannter Titel';
      this.eventPoster = event.poster || 'assets/poster1.jpg';
      this.eventLocation = event.location || 'Unbekannter Ort';
      this.eventDate = event.date || 'Unbekanntes Datum';
      this.eventTime = event.time || 'Unbekannte Uhrzeit';
      this.eventDescription = `Details for ${
        event.name || 'Unbekanntes Event'
      }`;
      this.isFavorite = event.favorite || false;
    } else {
      console.error('Event not found!');
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  shareEvent(): void {
    console.log('Event shared!');
  }

  addToCalendar(): void {
    console.log('Event added to calendar!');
  }
}
