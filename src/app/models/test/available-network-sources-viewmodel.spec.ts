import { TestBed } from '@angular/core/testing';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AvailableNetworkSources } from '../available-network-sources-viewmodel';
import { ConnectedStreet } from '../connected-street-model';

describe('AvailableNetworkSources', () => {
  it('should create expected object on passed arguments', () => {
    const gasConnectedStreet: ConnectedStreet = {
      name: 'some name',
      planned: true,
      plannedYear: 2021
    };

    const createdObject = AvailableNetworkSources.buildFromConnectedStreetData(
      gasConnectedStreet
    );
    expect(createdObject.gasNetworkAvailable).toBeTrue();
    expect(createdObject.gasNetworkPlanedOn).toBe(2021);
    expect(createdObject.heatingPlantAvailable).toBeFalse();
    expect(createdObject.heatingPlantPlannedOn).toBe(0);
  });
});
