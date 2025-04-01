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

  @Output() showPopover = new EventEmitter<{
    text: string;
    icon: string | undefined;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }>();

  isPopupVisible = false;

  constructor(private elementRef: ElementRef) {}

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
    const popoverElement =
      this.elementRef.nativeElement.querySelector('.popover');
    if (
      this.isPopupVisible &&
      popupElement &&
      !popupElement.contains(event.target as Node) &&
      (!eventButton || !eventButton.contains(event.target as Node)) &&
      (!popoverElement || !popoverElement.contains(event.target as Node))
    ) {
      this.togglePopup();
    }
  }

  OnSaveEvent(): void {
    console.log('Event Saved!');
    this.togglePopup();
  }

  OnAddToCalender(): void {
    this.showPopover.emit({
      text: 'Der Event wird zu deinem Kalender hinzugefügt.',
      icon: 'calendar_add_on',
      closeable: true,
      buttons: [
        { label: 'ABBRECHEN', action: 'cancel' },
        { label: 'BESTÄTIGEN', action: 'confirm-calendar' },
      ],
    });
    this.togglePopup();
  }

  OnShareEvent(): void {
    console.log('Event Shared!');
    this.togglePopup();
  }

  OnDeleteEvent(): void {
    console.log('Event Deleted!');
    this.togglePopup();
  }

  OnEditEvent(): void {
    console.log('Event Edited!');
    this.togglePopup();
  }
}
