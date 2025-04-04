import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Response } from 'express';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('read')
  async readCalendar() {
    return await this.calendarService.readCalendar();
  }

  @Post('create')
  async createCalendarEvent(
    @Body() eventData: {
      summary: string;
      start: Date;
      end: Date;
      location?: string;
      description?: string;
    },
  ) {
    return await this.calendarService.createCalendarEvent(eventData);
  }

  @Get('sweetDIEventkalender.ics')
  async downloadCalendar(@Res() res: Response) {
    const icsContent = await this.calendarService.generateICS();

    res.set({
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename="sweetDIEventkalender.ics"',
    });

    res.send(icsContent);
  }
}
