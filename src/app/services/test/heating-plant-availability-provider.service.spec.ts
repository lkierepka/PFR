import { TestBed } from '@angular/core/testing';
import { HeatingPlantStreetProviderService } from '../heating-plant-availability-provider.service';

describe('HeatingPlantStreetProviderService', () => {
  let service: HeatingPlantStreetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatingPlantStreetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
