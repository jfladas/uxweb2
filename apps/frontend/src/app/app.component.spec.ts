import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BarService } from './services/bar/bar.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [{
        provide: BarService,
        useValue: { api: jest.fn() }
      }]
    }).compileComponents();
  });

  it('', () => {
    // Test
  } );
});
