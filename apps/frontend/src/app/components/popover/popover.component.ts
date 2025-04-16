import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() buttons: { label: string; action: string }[] = [];
  @Input() closeable = false;
  @Output() buttonClick = new EventEmitter<string>();

  isVisible = false;
  isFadingOut = false;

  onButtonClick(action: string): void {
    if (action === 'cancel') {
      this.onClose();
    } else {
      this.buttonClick.emit(action);
      this.onClose();
    }
  }

  onOpen(): void {
    this.isVisible = true;
  }

  onClose(): void {
    this.isFadingOut = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isFadingOut = false;
    }, 300);
  }
}
