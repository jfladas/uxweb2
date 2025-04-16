import {
  Component,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent {
  @Input() event!: Event;

  @Output() showPopover = new EventEmitter<{
    text: string;
    icon: string | undefined;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }>();

  @Output() favoriteChange = new EventEmitter<{
    id: string;
    isFavorite: boolean;
  }>();

  isPopupVisible = false;
  isFavorite = false;

  constructor(private elementRef: ElementRef) {}

  togglePopup(): void {
    const buttonElement =
      this.elementRef.nativeElement.querySelector('.event-button');
    if (this.isPopupVisible) {
      setTimeout(() => {
        if (buttonElement) {
          buttonElement.classList.remove('active');
        }
      }, 300);
    } else {
      if (buttonElement) {
        buttonElement.classList.add('active');
      }
    }
    this.isPopupVisible = !this.isPopupVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const popupElement =
      this.elementRef.nativeElement.querySelector('.menu-popup');
    const eventButton =
      this.elementRef.nativeElement.querySelector('.event-button');
    if (
      this.isPopupVisible &&
      popupElement &&
      !popupElement.contains(event.target as Node) &&
      (!eventButton || !eventButton.contains(event.target as Node))
    ) {
      this.togglePopup();
    }
  }

  onFavoriteEvent(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteChange.emit({
      id: String(this.event.id),
      isFavorite: this.isFavorite,
    });
  }

  onAddToCalender(): void {
    this.showPopover.emit({
      text: 'Habe mir erlaubt, den angewählten Event zu deinem Kalender hinzuzufügen.',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'DAS IST EIN FEHLER.', action: 'cancel' },
        { label: 'FEIN', action: 'confirm-calendar' },
      ],
    });
  }

  onShareEvent(): void {
    const eventUrl = `${window.location.origin}/uxweb2/#/event/${this.event.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: this.event.name,
          text: `Schau dir diesen sweeten Event an: ${this.event.name}`,
          url: eventUrl,
        })
        .then(() => console.log('Event shared successfully!'))
        .catch((error) => console.error('Error sharing event:', error));
    } else {
      navigator.clipboard
        .writeText(eventUrl)
        .then(() => {
          alert('Event link copied to clipboard!');
        })
        .catch((error) => {
          console.error('Error copying link:', error);
        });
    }
  }

  onDeleteEvent(): void {
    this.showPopover.emit({
      text: 'Warte mal, willst du diesen Event wirklich löschen?',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'PAIN & NEIN', action: 'cancel' },
        { label: 'SWEET YES', action: 'confirm-delete' },
      ],
    });
  }

  onEditEvent(): void {
    console.log('Event Edited!');
  }

  getShortLocation(location?: string): string {
    if (!location) return '';
    return location.split(',')[0].trim();
  }
}
