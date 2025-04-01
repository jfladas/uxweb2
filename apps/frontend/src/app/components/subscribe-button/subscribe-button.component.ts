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

  onSubscribe(): void {
    this.showPopover.emit({
      text: 'Deine angewählten Events werden zu deinem Kalender hinzugefügt',
      icon: '',
      closeable: true,
      buttons: [
        { label: 'ABBRECHEN', action: 'cancel' },
        { label: 'BESTÄTIGEN', action: 'confirm-subscribe' },
      ],
    });
  }
}
