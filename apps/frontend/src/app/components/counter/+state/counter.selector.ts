import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Counter } from './counter.reducer';

export const selectCounterState = createFeatureSelector<Counter>('counter');

export const selectCounter = createSelector(
  selectCounterState,
  (state) => state.counter
);
