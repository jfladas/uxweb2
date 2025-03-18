import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './components/counter/+state/counter.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { CounterEffects } from './components/counter/+state/counter.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    provideState('counter', counterReducer),
    provideEffects([CounterEffects]),
    provideStoreDevtools(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
