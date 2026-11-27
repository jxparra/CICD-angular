import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-counter',
  styleUrl: './counter.css',
  templateUrl: './counter.html',
})
export class Counter {
  readonly value = signal(0);

  increment(): void {
    this.value.update((v) => v + 1);
  }

  decrement(): void {
    this.value.update((v) => (v > 0 ? v - 1 : 0));
  }

  reset(): void {
    this.value.set(0);
  }
}
