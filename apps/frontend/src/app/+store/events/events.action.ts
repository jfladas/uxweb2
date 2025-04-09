import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Event } from '../../models/event.model';

export const EventsActions = createActionGroup({
  source: 'Events',
  events: {
    'load events': emptyProps(),
    'load event success': props<{ events: Event[] }>(),
    'save event': props<{ event: Event }>(),
    'save event success': emptyProps(),

    // 💖 Neue Action zum Favorisieren eines Events
    'update favorite': props<{ eventId: string; isFavorite: boolean }>(),
  },
});
