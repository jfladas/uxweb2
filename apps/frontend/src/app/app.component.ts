import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component'; // ✅ Import der EventListComponent
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterModule, HeaderComponent, EventListComponent], // ✅ EventListComponent in imports hinzufügen
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
}
