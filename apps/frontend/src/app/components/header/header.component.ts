import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, SidebarComponent],
})
export class HeaderComponent {
  @Input() showBackArrow = false;
  @Input() showMenu = false;

  isSidebarOpen = false; // Add this property to control sidebar visibility

  private authService = inject(AuthService);

  constructor(private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.showMenu = auth.authenticated;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onBackArrowClick() {
    // Handle back arrow click
  }

  onMenuClick() {
    // Handle menu click
  }

}
