import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BarService } from './bar.service';

describe('BarService', () => {
  let service: BarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BarService]
    });
    service = TestBed.inject(BarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
