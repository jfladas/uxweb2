export class CreateEventDto {
  summary: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  category?: string;
}
