import { Injectable, Logger, OnModuleInit  } from '@nestjs/common';
import * as ical from 'node-ical';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Cron, CronExpression } from '@nestjs/schedule'; // <== wichtig!


@Injectable()
export class StairImportService {
  private readonly logger = new Logger(StairImportService.name);
  private readonly STAIR_ICAL_URL =
    'https://stair.ch/?post_type=tribe_events&ical=1&eventDisplay=list';

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async onModuleInit() {
    this.logger.log('⏳ Importiere STAIR Events beim App-Start...');
    await this.importEvents();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.log('🔁 Cronjob gestartet: STAIR Events Import');
    await this.importEvents();
  }
  
  async importEvents(): Promise<string> {
    try {
      const icalEvents = await ical.fromURL(this.STAIR_ICAL_URL);

      for (const key in icalEvents) {
        const icalEvent = icalEvents[key];

        if (icalEvent.type === 'VEVENT') {
          const existingEvent = await this.eventRepository.findOne({
            where: {
              summary: icalEvent.summary,
              start: icalEvent.start,
            },
          });

          const event = existingEvent || new Event();

          event.summary = icalEvent.summary;
          event.start = icalEvent.start;
          event.end = icalEvent.end;
          event.location = icalEvent.location || '';
          event.description = icalEvent.description || '';
          event.by = 'stair';

          await this.eventRepository.save(event);
        }
      }

      return '✅ STAIR Events erfolgreich importiert oder aktualisiert!';
    } catch (error) {
      throw new Error(
        `❌ Fehler beim Importieren oder Aktualisieren: ${error.message}`,
      );
    }
  }
}
