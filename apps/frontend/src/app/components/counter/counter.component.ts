import { Component, computed, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCounter } from './+state/counter.selector';
import { CounterActions } from './+state/counter.actions';

@Component({
  selector: 'app-counter.component',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counter = signal(0);
  doubled = computed(() => this.counter() * 2);

  increment = () => this.counter.update((counter: number) => counter + 1);
  decrement = () => this.counter.update((counter: number) => counter - 1);
  reset = () => this.counter.set(0);

  store$ = inject(Store);
  counter$ = this.store$.select(selectCounter);
  incrementNGRX = () => this.store$.dispatch(CounterActions.increment());
  decrementNGRX = () => this.store$.dispatch(CounterActions.decrement());
  resetNGRX = () => this.store$.dispatch(CounterActions.reset());
}
