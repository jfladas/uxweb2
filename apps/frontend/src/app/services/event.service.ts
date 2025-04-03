import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensure the service is provided in the root injector
})
export class EventService {
  private events = [
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
      favorite: false,
    },
    {
      id: '3',
      name: 'FRAME Meetup',
      date: '2025-05-05',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
      poster: 'assets/poster3.jpg',
      favorite: false,
    },
    {
      id: '4',
      name: 'Digital Oddities',
      date: '2025-05-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
      favorite: false,
    },
    {
      id: '5',
      name: 'DI-Party',
      date: '2025-06-03',
      location: 'Rotkreuz 9. Stock',
      time: '10:00 Uhr',
      by: 'di',
      poster: 'assets/poster1.jpg',
      favorite: false,
    },
    {
      id: '6',
      name: 'STAIR Event',
      date: '2025-06-24',
      location: 'Luzern',
      time: '13:30 Uhr',
      by: 'stair',
      poster: 'assets/poster2.jpg',
      favorite: false,
    },
    {
      id: '7',
      name: 'FRAME Meetup',
      date: '2025-07-05',
      location: 'Emmenbrücke',
      time: '16:00 Uhr',
      by: 'frame',
      favorite: false,
    },
    {
      id: '8',
      name: 'Digital Oddities',
      date: '2026-01-14',
      location: 'Rotkreuz 9. Stock',
      time: '17:00 Uhr',
      by: 'di',
      poster: 'assets/poster4.jpg',
      favorite: false,
    },
  ];

  getEvents(): any[] {
    return this.events;
  }

  getEventById(id: string) {
    return this.events.find((event) => event.id === id);
  }
}
