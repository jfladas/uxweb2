import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  eventId!: string;
  event?: Event;

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
    this.eventService.getEvents().subscribe((events) => {
      const found = events.find((e) => e.id?.toString() === this.eventId);
      if (found) {
        // Enrich with UI-friendly fields
        this.event = {
          ...found,
          name: found.summary,
          date: found.start.split('T')[0],
          time: found.start.split('T')[1]?.slice(0, 5),
        };
      } else {
        console.error('Event not found!');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    if (this.event) {
      this.event.favorite = !this.event.favorite;
    }
  }

  shareEvent(): void {
    console.log('Event shared!');
  }

  addToCalendar(): void {
    console.log('Event added to calendar!');
  }
}
