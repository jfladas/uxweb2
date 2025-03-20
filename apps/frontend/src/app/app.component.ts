import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component'; // ✅ Import der EventListComponent

@Component({
  imports: [RouterModule, HeaderComponent, EventListComponent], // ✅ EventListComponent in imports hinzufügen
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'frontend';
}
