export class CreateEventDto {
    summary: string;
    start: Date;
    end: Date;
    location?: string;
    description?: string;
    category?: string;
  }
  