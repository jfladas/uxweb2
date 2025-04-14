import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { StairImportService } from './events/stair-import.service';
import { CalendarModule } from './calendar/calendar.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Event]), // Event-Entity registrieren
    EventsModule, // Events-Modul hinzufügen
    CalendarModule, // NEU: Kalender-Funktionen modular
  ],
  controllers: [AppController],
  providers: [AppService, StairImportService], // Services
})
export class AppModule {}
