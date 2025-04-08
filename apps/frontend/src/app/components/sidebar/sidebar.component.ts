import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterModule],
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar(): void {
    this.closeSidebar.emit();
  }

  logout = () => {
    this.isSidebarOpen = false;
    this.closeSidebar.emit();
    this.authService.logout();
    this.router.navigate(['/login']);
  };
  createEvent() {
    // Handle create event click
  }

  homePage() {
    // Handle startseite click
  }
}
