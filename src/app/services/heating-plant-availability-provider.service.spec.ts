import { TestBed } from '@angular/core/testing';
import { HeatingPlantStreetProviderService } from './heating-plant-availability-provider.service';

describe('StreetProviderService', () => {
  let service: HeatingPlantStreetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatingPlantStreetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
