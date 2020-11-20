import { TestBed } from '@angular/core/testing';

import { StreetProviderService } from './street-provider.service';

describe('StreetProviderService', () => {
  let service: StreetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
