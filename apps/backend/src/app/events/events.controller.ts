import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents() {
    return this.eventsService.findAll();
  }

  @Get(':id') // 💡 Neuer GET-Endpunkt für einzelne Events
  async getEventById(@Param('id') id: string) {
    return this.eventsService.findOne(+id); // +id wandelt String zu number
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    console.log('📢 Event received:', createEventDto);
    return this.eventsService.create(createEventDto);
  }
}
