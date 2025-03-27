import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  imports: [DatePipe],
})
export class EventItemComponent {
  @Input() event!: {
    name: string;
    date: string;
    location: string;
    time: string;
    by: string;
    poster: string;
  };

  OnSaveEvent() {
    // Save the event
  }
  OnAddToCalender() {
    // Add the event to the calender
  }
  OnShareEvent() {
    // Share the event
  }
}
