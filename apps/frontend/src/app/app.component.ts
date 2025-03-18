import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarService } from './services/bar/bar.service';
import { map, Observable } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private barService = inject(BarService);

  title = 'frontend';

  api$: Observable<string> = this.barService
    .api()
    .pipe(map((response) => response.message));
}
