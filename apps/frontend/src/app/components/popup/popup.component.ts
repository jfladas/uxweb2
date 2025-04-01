import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() buttons: { label: string; action: string }[] = [];
  @Input() closeable = false;
  @Output() buttonClick = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<void>();

  isFadingOut = false;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'; // Disable scrolling
  }

  ngOnDestroy(): void {
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  onButtonClick(action: string): void {
    this.buttonClick.emit(action);
  }

  triggerClose(): void {
    this.isFadingOut = true;
    setTimeout(() => this.closeEvent.emit(), 300);
  }

  onClose(): void {
    this.triggerClose();
  }
}
