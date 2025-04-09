export interface Event {
  id?: string | number;
  summary: string;
  start: string;
  end: string;
  location: string;
  description?: string;
  favorite?: boolean;
  name: string;
  date: string;
  time: string;
  by?: string;
  poster?: string;
}