import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.scss'],
  imports: [CommonModule],
})
export class SubscribeButtonComponent {
  onSubscribe() {
    // Handle subscribe click
  }
}
