import { Controller, Get, Post, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('read')
  async readCalendar() {
    return await this.calendarService.readCalendar();
  }

  @Post('create')
  async createCalendarEvent(
    @Body() eventData: { summary: string; start: Date; end: Date; location?: string; description?: string }
  ) {
    return await this.calendarService.createCalendarEvent(eventData);
  }
}
