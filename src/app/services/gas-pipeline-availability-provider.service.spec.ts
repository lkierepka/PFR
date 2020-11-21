import { TestBed } from '@angular/core/testing';
import { GasPipelineStreetProviderService } from './gas-pipeline-availability-provider.service';

describe('StreetProviderService', () => {
  let service: GasPipelineStreetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasPipelineStreetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
