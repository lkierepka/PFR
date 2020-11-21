import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StreetProviderService } from '../street-provider.service';
import { HeatingSourceEnum } from './heating-source.enum';
import { NetworkHeatSourcesAvailabilityService } from '../services/heat-sources-availability.service';

export interface HeatingSource {
  value: HeatingSourceEnum;
  description: string;
}

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
})

export class CalculatorFormComponent implements OnInit {
  streetInput = new FormControl();
  constructor(public streetProvider: StreetProviderService,
              private readonly heatSourcesService: NetworkHeatSourcesAvailabilityService) { }

  public streets?: Observable<string[]>;
  public isGasAvailable?: Observable<boolean>;
  public gasPlannedYear?: Observable<number | undefined>;
  public isHeatingPlantAvailable?: Observable<boolean>;
  public heatingPlannedYear?: Observable<number | undefined>;

  public readonly heatingSources: HeatingSource[] = [
    { value: HeatingSourceEnum.coalFiredBoiler, description: 'Kocioł na węgiel' },
    { value: HeatingSourceEnum.condensingGasBoiler, description: 'Kondensacyjny kocioł gazowy' },
    { value: HeatingSourceEnum.convGasBoiler, description: 'Atmosferyczny kocioł gazowy' },
    { value: HeatingSourceEnum.electricHeater, description: 'Elektryczny piec' },
  ];

  public readonly familyMemberNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  public ngOnInit(): void {
    this.streets = this.streetProvider.streets$().pipe(mergeMap(streets =>
      this.streetInput?.valueChanges.pipe(map(street => this.filter(street, streets)))));
    this.isGasAvailable = this.streetInput.valueChanges.pipe(
      map(street => this.heatSourcesService.checkStreetHeatSources(street).gasNetworkAvailable));
    this.gasPlannedYear = this.streetInput.valueChanges.pipe(
      map(street => this.heatSourcesService.checkStreetHeatSources(street).gasNetworkPlanedOn));
    this.isHeatingPlantAvailable = this.streetInput.valueChanges.pipe(
      map(street => this.heatSourcesService.checkStreetHeatSources(street).heatingPlantAvailable));
    this.heatingPlannedYear = this.streetInput.valueChanges.pipe(
      map(street => this.heatSourcesService.checkStreetHeatSources(street).heatingPlantPlannedOn));
  }

  private filter(value: string, streets: string[]): string[] {
    const filterValue = value.toLowerCase();
    return streets.filter(street => street.toLowerCase().includes(filterValue));
  }
}
