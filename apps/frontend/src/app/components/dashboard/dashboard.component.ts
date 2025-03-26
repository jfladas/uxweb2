import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { EventListComponent } from '../event-list/event-list.component'; // 👈 EventList importieren
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    EventListComponent, // ✅ jetzt wirklich eingebunden!
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  eventservice = inject(EventService);
  eventForm = new FormGroup({
    titel: new FormControl(''),
    ort: new FormControl(''),
    datum: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
  });

  submit = () =>
    this.eventservice
      .createEvent({
        summary: this.eventForm.value.titel || '',
        location:this.eventForm.value.titel || '',
        start: this.timestamp(this.eventForm.value.start || '00:00'),
        end: this.timestamp(this.eventForm.value.end || '00:00'),
      })
      .subscribe();

      timestamp = (time?: string) =>`${this.eventForm.value.datum}T${time}`;
}
