import { TestBed } from '@angular/core/testing';

import { PerformanceGraphService } from './performance-graph.service';

describe('PerformanceGraphService', () => {
  let service: PerformanceGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
