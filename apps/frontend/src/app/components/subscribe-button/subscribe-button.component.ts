import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.scss'],
  imports: [CommonModule],
})
export class SubscribeButtonComponent {
  @Output() showPopover = new EventEmitter<{
    text: string;
    icon: string | undefined;
    closeable: boolean;
    buttons: { label: string; action: string }[];
  }>();

  isSubscribed = false;

  onSubscribe(): void {
    this.showPopover.emit({
      text: 'Habe mir erlaubt, den angewählten Event zu deinem Kalender hinzuzufügen.',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'DAS IST EIN FEHLER.', action: 'cancel' },
        { label: 'FEIN', action: 'confirm-subscribe' },
      ],
    });
  }

  markAsSubscribed(): void {
    this.isSubscribed = true;
  }
}
