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
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit, OnDestroy {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() buttons: { label: string; action: string }[] = [];
  @Input() closeable = false;
  @Output() buttonClick = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<void>();

  isFadingOut = false;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onButtonClick(action: string): void {
    this.buttonClick.emit(action);
  }

  onClose(): void {
    this.isFadingOut = true;
    setTimeout(() => {
      this.isFadingOut = false;
      this.closeEvent.emit();
    }, 300);
  }
}
