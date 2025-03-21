import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {
    console.log('📢 EventsController wurde geladen!');
  }

  @Get()
  async getEvents() {
    return this.eventsService.findAll();
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
