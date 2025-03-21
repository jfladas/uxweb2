import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() showBackArrow = false;
  @Input() showMenu = false;

  private authService = inject(AuthService);

  constructor() {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.showMenu = auth.authenticated;
    });
  }
  logout = () => {
    this.authService.logout();
    this.showMenu = false;
  };

  onBackArrowClick() {
    // Handle back arrow click
  }
  onMenuClick() {
    // Handle menu click
    this.logout();
  }
}
