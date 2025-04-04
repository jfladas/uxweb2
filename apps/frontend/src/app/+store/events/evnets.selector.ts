import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Events } from "./events.reducer";

export const selectEventsState = createFeatureSelector<Events>('events');

export const selectEvents = createSelector(
   selectEventsState,
   (state) => state.events
);
