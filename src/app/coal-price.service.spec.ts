import { TestBed } from '@angular/core/testing';

import { CoalPriceService } from './coal-price.service';

describe('CoalPriceService', () => {
  let service: CoalPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoalPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
