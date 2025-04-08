import {
  Component,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() event!: {
    id: string;
    name: string;
    date: string;
    location: string;
    time: string;
    by: string;
    poster: string;
    favorite: boolean;
  };

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
  isFavorite!: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.isFavorite = this.event.favorite;
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
    const popupElement =
      this.elementRef.nativeElement.querySelector('.menu-popup');
    if (popupElement) {
      if (this.isPopupVisible) {
        popupElement.classList.add('visible');
      } else {
        popupElement.classList.remove('visible');
      }
    }
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

  OnSaveEvent(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteChange.emit({
      id: this.event.id,
      isFavorite: this.isFavorite,
    });
  }

  OnAddToCalender(): void {
    this.showPopover.emit({
      text: 'Der Event wird zu deinem Kalender hinzugefügt.',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'ABBRECHEN', action: 'cancel' },
        { label: 'BESTÄTIGEN', action: 'confirm-calendar' },
      ],
    });
  }

  OnShareEvent(): void {
    const eventUrl = `${window.location.origin}/#/event/${this.event.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: this.event.name,
        text: `Check out this event: ${this.event.name}`,
        url: eventUrl,
      })
      .then(() => console.log('Event shared successfully!'))
      .catch((error) => console.error('Error sharing event:', error));
    } else {
      navigator.clipboard.writeText(eventUrl).then(() => {
        alert('Event link copied to clipboard!');
      }).catch((error) => {
        console.error('Error copying link:', error);
      });
    }
  }

  OnDeleteEvent(): void {
    this.showPopover.emit({
      text: 'Willst du diesen Event wirklich löschen?',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'ABBRECHEN', action: 'cancel' },
        { label: 'BESTÄTIGEN', action: 'confirm-delete' },
      ],
    });
  }

  OnEditEvent(): void {
    console.log('Event Edited!');
  }
}
