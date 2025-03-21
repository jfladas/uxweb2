import { Injectable } from '@nestjs/common';
import * as ical from 'node-ical';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Injectable()
export class StairImportService {
  private readonly STAIR_ICAL_URL = 'https://stair.ch/?post_type=tribe_events&ical=1&eventDisplay=list';

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async importEvents(): Promise<string> {
    try {
      const icalEvents = await ical.fromURL(this.STAIR_ICAL_URL);
      for (const key in icalEvents) {
        if (icalEvents[key].type === 'VEVENT') {
          const event = new Event();
          event.summary = icalEvents[key].summary;
          event.start = icalEvents[key].start;
          event.end = icalEvents[key].end;
          event.location = icalEvents[key].location || '';
          event.description = icalEvents[key].description || '';

          await this.eventRepository.save(event);
        }
      }
      return '✅ STAIR Events erfolgreich importiert!';
    } catch (error) {
      throw new Error(`❌ Fehler beim Importieren: ${error.message}`);
    }
  }
}
