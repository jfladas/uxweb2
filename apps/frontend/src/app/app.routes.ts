import { Route } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'event/:id', component: EventDetailComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
];
