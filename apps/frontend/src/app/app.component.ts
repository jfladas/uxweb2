import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarService } from './services/bar/bar.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe, RouterModule],
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
