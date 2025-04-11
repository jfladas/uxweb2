import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from './guards/auth/auth.config';
import { env } from '../env/env';
import { provideState, provideStore } from '@ngrx/store';
import { eventsReducer } from './+store/events/events.reducer';
import { EventsEffects } from './+store/events/events.effects';
import { provideEffects } from '@ngrx/effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([EventsEffects]),
    provideStore(),
    provideState('events', eventsReducer),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: [env.api],
      },
    }),
    { provide: AuthConfig, useValue: authConfig },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};

export { authConfig };

