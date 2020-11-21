import { Injectable } from '@angular/core';
import { HeatingPlantStreetProviderService } from './heating-plant-availability-provider.service';
import { GasPipelineStreetProviderService } from './gas-pipeline-availability-provider.service';
import { Observable } from 'rxjs';
import { AvailableNetworkSources } from '../models/available-network-sources-viewmodel';
import { ConnectedStreet } from '../models/connected-street-model';

@Injectable({
  providedIn: 'root'
})
export class NetworkHeatSourcesAvailabilityService {
  private gasPipelineStreets: ConnectedStreet[] = [];
  private heatingPlantStreets: ConnectedStreet[] = [];

  constructor(
    private readonly heatingPlantService: HeatingPlantStreetProviderService,
    private readonly gasPipelineService: GasPipelineStreetProviderService
  ) {
    heatingPlantService.ConnectedStreets.subscribe(
      heatingPlantStreets => {
        this.heatingPlantStreets = heatingPlantStreets;
      },
      error => {
        console.log(error);
      }
    );
    gasPipelineService.ConnectedStreets.subscribe(
      gasPipelineStreets => {
        this.gasPipelineStreets = gasPipelineStreets;
      },
      error => {
        console.log(error);
      }
    );
  }

  public checkStreetHeatSources(streetName: string): AvailableNetworkSources {
    const gasPipelineConnectedStreet = this.gasPipelineStreets.find(
      connectedStreets =>
        connectedStreets.name.toLowerCase() === streetName.toLowerCase()
    );
    const heatingPlantConnectedStreet = this.heatingPlantStreets.find(
      connectedStreets =>
        connectedStreets.name.toLowerCase() === streetName.toLowerCase()
    );
    return AvailableNetworkSources.buildFromConnectedStreetData(
      gasPipelineConnectedStreet,
      heatingPlantConnectedStreet
    );
  }
}
