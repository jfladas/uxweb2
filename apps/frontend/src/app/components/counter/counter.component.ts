import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter.component',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counter = signal(0);
  doubled = computed(() => this.counter() * 2);

  increment = () => this.counter.update((counter: number) => counter + 1);
  decrement = () => this.counter.update((counter: number) => counter - 1);
  reset = () => this.counter.set(0);
}
