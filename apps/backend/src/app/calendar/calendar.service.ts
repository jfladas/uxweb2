import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../events/event.entity';
import { Repository } from 'typeorm';
import { ICalCalendar } from 'ical-generator';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async generateICS(): Promise<string> {
    try {
      const events = await this.eventRepository.find();
      const calendar = new ICalCalendar({ name: 'sweet DI Eventkalender' });

      for (const event of events) {
        calendar.createEvent({
          start: event.start,
          end: event.end,
          summary: event.summary,
          description: event.description || '',
          location: event.location || '',
        });
      }

      return calendar.toString();
    } catch (error) {
      throw new Error(`❌ Fehler beim Erstellen der iCalendar-Datei: ${error.message}`);
    }
  }

  async readCalendar(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async createCalendarEvent(eventData: {
    summary: string;
    start: Date;
    end: Date;
    location?: string;
    description?: string;
  }): Promise<string> {
    const event = this.eventRepository.create(eventData);
    await this.eventRepository.save(event);
    return '✅ Event erfolgreich gespeichert!';
  }
}
