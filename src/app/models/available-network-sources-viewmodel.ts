import { ConnectedStreet } from './connectedStreet';

export class AvailableNetworkSources {
  gasNetworkAvailable: boolean;
  gasNetworkPlanedOn: number;
  heatingPlantAvailable: boolean;
  heatingPlantPlannedOn?: number;

  constructor() {
    this.gasNetworkAvailable = false;
    this.gasNetworkPlanedOn = 0;
    this.heatingPlantAvailable = false;
    this.heatingPlantPlannedOn = 0;
  }

  public static buildFromConnectedStreetData(
    gasNetworkStreetData?: ConnectedStreet,
    heatingPlantStreetData?: ConnectedStreet
  ): AvailableNetworkSources {
    const availabilityObject = new AvailableNetworkSources();
    if (gasNetworkStreetData) {
      availabilityObject.gasNetworkAvailable = true;
      if (gasNetworkStreetData.planed) {
        availabilityObject.gasNetworkPlanedOn = gasNetworkStreetData.planedYear;
      }
    }
    if (heatingPlantStreetData) {
      availabilityObject.heatingPlantAvailable = true;
      if (heatingPlantStreetData.planed) {
        availabilityObject.heatingPlantPlannedOn =
          heatingPlantStreetData.planedYear;
      }
    }
    return availabilityObject;
  }
}
