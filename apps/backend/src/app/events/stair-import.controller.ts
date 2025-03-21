import { Controller, Get } from '@nestjs/common';
import { StairImportService } from './stair-import.service';

@Controller('stair-import')
export class StairImportController {
  constructor(private readonly stairImportService: StairImportService) {}

  @Get()
  async importEvents(): Promise<string> {
    return this.stairImportService.importEvents(); // ✅ Methode sollte existieren
  }
}
