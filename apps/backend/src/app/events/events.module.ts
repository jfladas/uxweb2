import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './event.entity';
import { StairImportService } from './stair-import.service';
import { StairImportController } from './stair-import.controller'; // ✅ Muss importiert sein

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController, StairImportController], // ✅ Muss hier sein
  providers: [EventsService, StairImportService], // ✅ Muss hier sein
  exports: [EventsService, StairImportService],
})
export class EventsModule {}
