import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './event.entity';
import { StairImportService } from './stair-import.service';
import { StairImportController } from './stair-import.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([Event])], // ✅ Ensure Event entity is registered
  controllers: [EventsController, StairImportController], 
  providers: [EventsService, StairImportService], 
  exports: [EventsService, StairImportService], 
})
export class EventsModule {}
