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
      this.eventTitle = event.name;
      this.eventPoster = event.poster || '';
      this.eventLocation = event.location;
      this.eventDate = event.date;
      this.eventTime = event.time;
      this.eventDescription = `Details for ${event.name}`;
      this.isFavorite = event.favorite;
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
