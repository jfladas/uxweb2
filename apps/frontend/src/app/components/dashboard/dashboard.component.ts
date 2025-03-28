import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { EventListComponent } from '../event-list/event-list.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    SearchComponent,
    FilterChipsComponent,
    SubscribeButtonComponent,
    EventListComponent, // ✅ now included
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private sanitzer = inject(DomSanitizer);
  eventservice = inject(EventService);
  eventForm = new FormGroup({
    titel: new FormControl(''),
    ort: new FormControl(''),
    datum: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
  });

  markers: any[] = []; 
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };

  iframeSrc:SafeResourceUrl = ''; // Property to hold the dynamic iframe source URL

  // Submit the event form
  submit = () => {
    this.eventservice
      .createEvent({
        summary: this.eventForm.value.titel || '',
        location: this.eventForm.value.ort || '',
        start: this.timestamp(this.eventForm.value.start || '00:00'),
        end: this.timestamp(this.eventForm.value.end || '00:00'),
        description: this.eventForm.value.description || '',
      })
      .subscribe(() => {
        // After submitting the form, update the iframe location with the entered location
        this.updateIframeLocation(this.eventForm.value.ort || '');
      });
  };

  timestamp = (time?: string) => `${this.eventForm.value.datum}T${time}`;

  // Update iframe source based on the location
  updateIframeLocation(location: string): void {
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBOL61GjI2pEwNlEkFcliwWI0PRHNif-ec&q=${encodeURIComponent(location)}`;
    console.log('Google Maps URL:', googleMapsUrl);
    this.iframeSrc = this.sanitzer.bypassSecurityTrustResourceUrl(googleMapsUrl);
  }

  // Load events from the backend and update the iframe with the first event's location
  loadEvents(): void {
    this.eventservice.getEvents().subscribe({
      next: (data) => {
        console.log('📦 Events data from backend:', data);

        // Dynamically update the iframe with the location of the first event
        if (data.length > 0) {
          this.updateIframeLocation(data[0].location); // Set location for the first event
        }
      },
      error: (error) => {
        console.error('❌ Error while loading events:', error);
      },
    });
  }
}
