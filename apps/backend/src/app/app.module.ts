import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { CalendarModule } from './calendar/calendar.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(), // 🕒 Scheduler aktivieren
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
    EventsModule, // Events-Modul mit STAIR-Import
    CalendarModule, // Kalender-Logik
  ],
  controllers: [AppController],
  providers: [AppService], // StairImportService ist im EventsModule
})
export class AppModule {}
