import { createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface Counter {
  counter: number;
}

export const initialState: Counter = { counter: 0 };

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.decrement, (state) => ({
    ...state,
    counter: state.counter - 1,
  })),
  on(CounterActions.increment, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(CounterActions.reset, (state) => ({ ...state, counter: 0 }))
);
