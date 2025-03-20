import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() showBackArrow = true;

  onBackArrowClick() {
    // Handle back arrow click
  }
  onMenuClick() {
    // Handle menu click
  }
}
