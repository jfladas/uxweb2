import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Event } from "../../services/event.service"; 
export const EventsActions = createActionGroup({
    source: 'Events',
    events: {
        'load events': emptyProps(),
        'load event success': props<{ events: Event[] }>(),
        "save event": props<{ event: Event }>(),
        "save event success": emptyProps()
    
    },
 });
 