import { TestBed } from '@angular/core/testing';

import { ApiRoutingService } from './api-routing.service';

describe('ApiRoutingService', () => {
  let service: ApiRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
