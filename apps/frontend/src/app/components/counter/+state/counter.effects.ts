import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CounterActions } from './counter.actions';
import { selectCounter } from './counter.selector';
import { filter, map, withLatestFrom } from 'rxjs';

@Injectable()
export class CounterEffects {
  actions$ = inject(Actions);
  store$ = inject(Store<'counter'>);
  checkThreshold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.increment),
      withLatestFrom(this.store$.select(selectCounter)),
      filter(([, count]) => count === 5),
      map(() => CounterActions.threshold({ threshold: 5 }))
    )
  );
}
