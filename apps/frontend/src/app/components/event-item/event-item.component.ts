import {
  Component,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, DatePipe, PopoverComponent],
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

  @ViewChild(PopoverComponent) popoverComponent?: PopoverComponent;

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

  OnSaveEvent() {
    console.log('Event Saved!');
    this.togglePopup();
  }

  OnAddToCalender() {
    this.showConfirmationPopover(
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
        this.showConfirmationPopover(
          'Juhuu! Der Event wurde erfolgreich zu deinem Kalender hinzugefügt!',
          'event_available',
          false,
          []
        );
        break;
      case 'cancel':
        this.handlePopoverClose();
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  handlePopoverClose(): void {
    if (this.popoverComponent) {
      this.popoverComponent.triggerClose();
      setTimeout(() => {
        this.confirmationPopup = false;
      }, 300);
    }
  }

  private showConfirmationPopover(
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
        this.handlePopoverClose();
      }, 1500);
    }
  }
}
