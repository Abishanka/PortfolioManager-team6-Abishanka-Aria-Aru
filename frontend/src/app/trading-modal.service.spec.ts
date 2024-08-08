import { TestBed } from '@angular/core/testing';

import { TradingModalService } from './trading-modal.service';

describe('TradingModalService', () => {
  let service: TradingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
