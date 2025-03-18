const express = require('express');
const ical = require('ical-generator');

const app = express();

// Create the calendar
const calendar = ical({ name: 'My Public Calendar' });

calendar.createEvent({
  start: new Date(),
  end: new Date(new Date().getTime() + 60 * 60 * 1000),
  summary: 'Public Event',
  description: 'This event is visible to subscribers.',
  location: 'Online',
  organizer: { name: 'Admin', email: 'admin@example.com' }
});

// Serve the calendar
app.get('/calendar.ics', (req, res) => {
  res.setHeader('Content-Type', 'text/calendar');
  res.send(calendar.toString());
});


// A simple route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(3000, () => console.log('🌐 Server running on http://localhost:3000'));
