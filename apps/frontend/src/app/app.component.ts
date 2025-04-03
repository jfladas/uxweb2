import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, HeaderComponent], // ✅ EventListComponent in imports hinzufügen
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
}
