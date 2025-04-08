import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Array<{
    id: string;
    name: string;
    date: string;
    location: string;
    time: string;
    by: string;
    poster?: string;
    favorite?: boolean;
  }> = [
    {
      id: '1',
      name: 'DI-Party',
      date: '2025-04-03',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
      favorite: false,
    },
    {
      id: '2',
      name: 'STAIR Event',
      date: '2025-04-24',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
    },
    {
      id: '3',
      name: 'Digital Oddities',
      date: '2025-05-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
    },
    {
      id: '4',
      name: 'DI-Party',
      date: '2025-06-03',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
    },
    {
      id: '5',
      name: 'Switch 2 Party & Lükas Geburtstag',
      date: '2025-06-05',
      location: 'Rotkreuz 9. Stock',
      time: '18:00 Uhr',
      by: 'di',
    },
    {
      id: '6',
      name: 'STAIR Event',
      date: '2025-06-24',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
      poster: 'assets/poster2.jpg',
    },
    {
      id: '7',
      name: 'FRAME Meetup',
      date: '2025-07-05',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
    },
    {
      id: '8',
      name: 'Digital Oddities',
      date: '2026-01-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
    },
  ];

  getEvents(): any[] {
    return this.events;
  }

  getEventById(id: string) {
    return this.events.find((event) => event.id === id);
  }
}
