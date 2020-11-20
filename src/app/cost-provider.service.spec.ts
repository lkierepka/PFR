import { TestBed } from '@angular/core/testing';

import { CostProviderService } from './cost-provider.service';

describe('CostProviderService', () => {
  let service: CostProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
