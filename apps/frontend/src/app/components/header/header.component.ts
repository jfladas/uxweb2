import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

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
  isSidebarOpen = false;

  constructor(private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.showMenu = auth.authenticated;
    });
  }
  logout = () => {
    this.isSidebarOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showMenu = false;
  };

  onBackArrowClick() {
    // Handle back arrow click
  }
  onMenuClick() {
    // Handle menu click
    this.logout();
  }
  createEvent() {
    // Handle create event click
  }

  startseite() {
    // Handle startseite click
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
