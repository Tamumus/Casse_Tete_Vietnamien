import { TestBed } from '@angular/core/testing';

import { CombinationService } from '../api/combination-calculation.service';

describe('CombinationCalculationDisplay', () => {
  let service: CombinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
