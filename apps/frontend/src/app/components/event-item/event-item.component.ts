import {
  Component,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, DatePipe, PopupComponent],
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

  @ViewChild(PopupComponent) popupComponent?: PopupComponent;

  isPopupVisible = false;
  confirmationPopup = false;
  confirmationText = '';
  confirmationButtons: { label: string; action: string }[] = [];
  confirmationIcon?: string;
  confirmationCloseable = true;

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
    if (
      this.isPopupVisible &&
      popupElement &&
      !popupElement.contains(event.target as Node) &&
      (!eventButton || !eventButton.contains(event.target as Node))
    ) {
      this.togglePopup();
    }
  }

  OnSaveEvent() {
    console.log('Event Saved!');
    this.togglePopup();
  }

  OnAddToCalender() {
    this.showConfirmationPopup(
      'Der Event wird zu deinem Kalender hinzugefügt.',
      '',
      true,
      [
        { label: 'ABBRECHEN', action: 'cancel' },
        { label: 'BESTÄTIGEN', action: 'confirm-calendar' },
      ]
    );
  }

  OnShareEvent() {
    console.log('Event Shared!');
    this.togglePopup();
  }

  OnDeleteEvent() {
    console.log('Event Deleted!');
    this.togglePopup();
  }

  OnEditEvent() {
    console.log('Event Edited!');
    this.togglePopup();
  }

  handlePopupAction(action: string): void {
    switch (action) {
      case 'confirm-calendar':
        this.showConfirmationPopup(
          'Juhuu! Der Event wurde erfolgreich zu deinem Kalender hinzugefügt!',
          'event_available',
          false,
          []
        );
        break;
      case 'cancel':
        this.handlePopupClose();
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  handlePopupClose(): void {
    if (this.popupComponent) {
      this.popupComponent.triggerClose();
      setTimeout(() => {
        this.confirmationPopup = false;
      }, 300);
    }
  }

  private showConfirmationPopup(
    text: string,
    icon: string,
    isCloseable: boolean,
    buttons: { label: string; action: string }[]
  ): void {
    this.confirmationText = text;
    this.confirmationIcon = icon;
    this.confirmationCloseable = isCloseable;
    this.confirmationButtons = buttons;
    this.confirmationPopup = true;

    if (!isCloseable) {
      setTimeout(() => {
        this.handlePopupClose();
      }, 1500);
    }
  }
}
