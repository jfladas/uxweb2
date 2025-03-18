import ical from 'node-ical';

// Read the .ics file
const events = await ical.parseFile('my_calendar.ics');

for (const key in events) {
  if (events[key].type === 'VEVENT') {
    console.log(`📅 Event: ${events[key].summary}`);
    console.log(`📍 Location: ${events[key].location}`);
    console.log(`⏰ Start Time: ${events[key].start}`);
    console.log(`⏳ End Time: ${events[key].end}`);
  }
}

