import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
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

  isPopupVisible = false;

  constructor(private elementRef: ElementRef) {}

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (
      this.isPopupVisible &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.isPopupVisible = false;
    }
  }

  OnSaveEvent() {
    console.log('Event Saved!');
  }

  OnAddToCalender() {
    console.log('Event Added to Calendar!');
  }

  OnShareEvent() {
    console.log('Event Shared!');
  }

  OnDeleteEvent() {
    console.log('Event Deleted!');
  }

  OnEditEvent() {
    console.log('Event Edited!');
  }
}
