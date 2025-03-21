import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component'; // ✅ Import der EventListComponent

@Component({
  imports: [RouterModule, EventListComponent], // ✅ EventListComponent in imports hinzufügen
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
