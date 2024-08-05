import { TestBed } from '@angular/core/testing';

import { GloalSearchService } from './gloal-search.service';

describe('GloalSearchService', () => {
  let service: GloalSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloalSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
