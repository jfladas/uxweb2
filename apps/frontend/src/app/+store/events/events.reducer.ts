import { EventsActions } from "./events.action";
import { Event } from "../../services/event.service"; 
import { createReducer, on } from "@ngrx/store";

export interface Events { events: Event[]; };

export const initialState: Events = { events: [] };

export const eventsReducer = createReducer(
   initialState,
   on(EventsActions.loadEventSuccess, (state, { events }) => ({ ...state, events })),
);
