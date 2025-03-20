import 'dotenv/config';
console.log("🌍 STAIR_ICAL_URL:", process.env.STAIR_ICAL_URL);
import ical from 'node-ical';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config(); // .env Datei laden

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'my_calendar',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

const STAIR_ICAL_URL = process.env.STAIR_ICAL_URL.replace('webcal://', 'https://');

async function fetchAndStoreStairEvents() {
  try {
    console.log('🔄 Lade STAIR iCalendar Daten...');
    const events = await ical.fromURL(STAIR_ICAL_URL);

    let count = 0;
    for (const key in events) {
      if (events[key].type === 'VEVENT') {
        const event = events[key];

        await pool.query(
            `INSERT INTO events (summary, start, "end", location, description, category) 
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (summary, start, "end") DO NOTHING;`,  // Verhindert doppelte Einträge
            [event.summary, event.start, event.end, event.location, event.description, "Stair"]
          );
          
        count++;
      }
    }

    console.log(`✅ ${count} STAIR-Events erfolgreich gespeichert!`);
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der STAIR-Events:', error.message);
  } finally {
    pool.end();
  }
}

fetchAndStoreStairEvents();
