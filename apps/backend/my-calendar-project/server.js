import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import ical from 'ical-generator';

dotenv.config();
const app = express();
app.use(express.json());

// 📌 PostgreSQL Verbindung
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'my_calendar',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

// 📌 API: Event speichern
app.post('/events', async (req, res) => {
    const { summary, start, end, location, description, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO events (summary, start, "end", location, description, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [summary, start, end, location, description, category]
        );
        res.json({ message: '✅ Event gespeichert!', event: result.rows[0] });
    } catch (err) {
        console.error('❌ Fehler beim Speichern:', err);
        res.status(500).json({ message: '❌ Fehler beim Speichern', error: err });
    }
});

// 📌 API: Alle Events abrufen
app.get('/events', async (req, res) => {
    try {
        const categoryFilter = req.query.category;
        let result;
        if (categoryFilter) {
            result = await pool.query('SELECT * FROM events WHERE category = $1', [categoryFilter]);
        } else {
            result = await pool.query('SELECT * FROM events');
        }
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Fehler beim Abrufen:', err);
        res.status(500).json({ message: '❌ Fehler beim Abrufen', error: err });
    }
});

// 📌 API: .ics-Datei generieren
app.get('/calendar.ics', async (req, res) => {
    try {
        const categoryFilter = req.query.category;
        let result;
        if (categoryFilter) {
            result = await pool.query('SELECT * FROM events WHERE category = $1', [categoryFilter]);
        } else {
            result = await pool.query('SELECT * FROM events');
        }

        // iCalendar erstellen
        const calendar = ical({ name: 'HSLU Events' });

        result.rows.forEach(event => {
            calendar.createEvent({
                start: event.start,
                end: event.end,
                summary: event.summary,
                description: event.description,
                location: event.location
            });
        });

        res.setHeader('Content-Type', 'text/calendar');
        res.send(calendar.toString());
    } catch (err) {
        console.error('❌ Fehler beim Generieren der .ics Datei:', err);
        res.status(500).json({ message: '❌ Fehler beim Generieren der .ics Datei', error: err });
    }
});

// 📌 Test-Route
app.get('/', (req, res) => {
    res.send('✅ Server läuft mit PostgreSQL!');
});

// Server starten
const PORT = process.env.PORT || 4000;  // Ändere den Port auf 4000
app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));

import { exec } from 'child_process';

setInterval(() => {
  console.log('🔄 Starte Import der STAIR-Events...');
  exec('node import-stair-ical.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Fehler beim Import: ${error.message}`);
    } else {
      console.log(stdout);
    }
  });
}, 15 * 60 * 1000); // Alle 15 Minuten

app.get('/events', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM events ORDER BY start ASC');
      res.json(result.rows);
  } catch (error) {
      console.error('❌ Fehler beim Abrufen der Events:', error);
      res.status(500).json({ message: '❌ Fehler beim Abrufen der Events' });
  }
});