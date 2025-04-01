import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
import { EventService } from "../../services/event.service";
import { EventsActions } from "./events.action";


@Injectable()
export class EventsEffects {
   actions$ = inject(Actions);
   store$ = inject(Store<'events'>);
service = inject(EventService);

   loadEvents$ = createEffect(() =>
       this.actions$.pipe(
           ofType(EventsActions.loadEvents, EventsActions.saveEventSuccess),
           mergeMap(() => this.service.getEvents()),
           map((events) => EventsActions.loadEventSuccess({ events }))
       )
   );

saveEvent$ = createEffect(() =>
this.actions$.pipe(
    ofType(EventsActions.saveEvent),
    mergeMap (({event}) => this.service.createEvent(event)),
    map(() => EventsActions.saveEventSuccess())
)
);




}
