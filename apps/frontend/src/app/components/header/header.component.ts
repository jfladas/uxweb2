import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, SidebarComponent, RouterModule],
})
export class HeaderComponent {
  @Input() showMenu = false;

  isSidebarOpen = false;

  private authService = inject(AuthService);

  constructor(private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.showMenu = auth.authenticated;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  addEvent() {
    // Handle create event click
  }
}
