import { TestBed } from '@angular/core/testing';

import { FundsModalService } from './funds-modal.service';

describe('FundsModalService', () => {
  let service: FundsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
