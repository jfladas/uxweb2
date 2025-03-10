import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarService } from './services/bar/bar.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FooComponent } from './components/foo/foo.component';

@Component({
  imports: [AsyncPipe, RouterModule, FooComponent],
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
