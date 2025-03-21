import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ICalCalendar } from 'ical-generator';
import nodeIcal from 'node-ical';

@Injectable()
export class CalendarService {
  private readonly filePath = 'my_calendar.ics';

  /**
   * 🟢 Liest Events aus einer bestehenden `.ics`-Datei
   */
  async readCalendar(): Promise<any[]> {
    try {
      const events = await nodeIcal.parseFile(this.filePath);
      const eventList = Object.values(events)
        .filter((event: any) => event.type === 'VEVENT')
        .map((event: any) => ({
          summary: event.summary,
          location: event.location,
          start: event.start,
          end: event.end,
        }));

      return eventList;
    } catch (error) {
      throw new Error(`❌ Fehler beim Lesen der iCalendar-Datei: ${error.message}`);
    }
  }

  /**
   * 🟢 Erstellt eine neue `.ics`-Datei mit einem Event
   */
  async createCalendarEvent(eventData: { summary: string; start: Date; end: Date; location?: string; description?: string; }): Promise<string> {
    try {
        const calendar = new ICalCalendar({ name: 'My Calendar' });
        calendar.createEvent({
        start: eventData.start,
        end: eventData.end,
        summary: eventData.summary,
        description: eventData.description || '',
        location: eventData.location || '',
      });

      fs.writeFileSync(this.filePath, calendar.toString());
      return '✅ iCalendar-Datei erfolgreich erstellt!';
    } catch (error) {
      throw new Error(`❌ Fehler beim Erstellen der iCalendar-Datei: ${error.message}`);
    }
  }
}
