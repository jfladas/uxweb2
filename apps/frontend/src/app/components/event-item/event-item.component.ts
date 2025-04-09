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
    this.isPopupVisible = !this.isPopupVisible;
    const popupElement =
      this.elementRef.nativeElement.querySelector('.menu-popup');
    if (popupElement) {
      popupElement.classList.toggle('visible', this.isPopupVisible);
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
      id: String(this.event.id), // ✅ sicherstellen, dass string übergeben wird
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
    console.log('Event Shared!');
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
