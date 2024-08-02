import { TestBed } from '@angular/core/testing';

import { InvestmentGraphDataService } from './investment-graph-data.service';

describe('InvestmentGraphDataService', () => {
  let service: InvestmentGraphDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentGraphDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
