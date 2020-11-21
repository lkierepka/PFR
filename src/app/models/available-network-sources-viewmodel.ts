import { ConnectedStreet } from './connected-street-model';

export class AvailableNetworkSources {
  gasNetworkAvailable: boolean;
  gasNetworkPlanedOn?: number;
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
      availabilityObject.gasNetworkAvailable = !gasNetworkStreetData.planned;
      if (gasNetworkStreetData.planned) {
        availabilityObject.gasNetworkPlanedOn =
          gasNetworkStreetData.plannedYear;
      }
    }
    if (heatingPlantStreetData) {
      availabilityObject.heatingPlantAvailable = !heatingPlantStreetData.planned;
      if (heatingPlantStreetData.planned) {
        availabilityObject.heatingPlantPlannedOn =
          heatingPlantStreetData.plannedYear;
      }
    }
    return availabilityObject;
  }
}
