import ical from 'ical-generator';
import fs from 'fs';

// Create a new calendar
const calendar = ical({ name: 'My Calendar' });

// Add an event
calendar.createEvent({
  start: new Date(), // Start time (now)
  end: new Date(new Date().getTime() + 60 * 60 * 1000), // End time (1 hour later)
  summary: 'Meeting with Team',
  description: 'Discuss project updates',
  location: 'Zoom',
  organizer: { name: 'John Doe', email: 'john@example.com' }
});

// Save to a .ics file
fs.writeFileSync('my_calendar.ics', calendar.toString());

console.log('✅ iCalendar file created: my_calendar.ics');
