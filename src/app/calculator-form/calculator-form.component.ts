import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { StreetProviderService } from '../street-provider.service';
import { HeatingSourceEnum } from './heating-source.enum';
import { NetworkHeatSourcesAvailabilityService } from '../services/heat-sources-availability.service';
import { HeatingSource } from './i-heating-source';

export interface CalculatorFormValue {
  street: string;
  currentHeatSource: HeatingSourceEnum;
  houseSize: number;
  occupants: number;
}

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
})
export class CalculatorFormComponent implements OnInit {
  @Output()
  formSubmitted = new EventEmitter<CalculatorFormValue>();

  calculatorForm = new FormGroup({
    street: new FormControl(),
    currentHeatSource: new FormControl(),
    houseSize: new FormControl(),
    occupants: new FormControl(),
    houseType: new FormControl(),
    thermalInsulation: new FormControl(),
  });
  get streetInput() {
    return this.calculatorForm.controls['street'];
  }
  constructor(
    public streetProvider: StreetProviderService,
    private readonly heatSourcesService: NetworkHeatSourcesAvailabilityService
  ) {}

  public streets?: Observable<string[]>;
  public isGasAvailable?: Observable<boolean>;
  public gasPlannedYear?: Observable<number | undefined>;
  public isHeatingPlantAvailable?: Observable<boolean>;
  public heatingPlannedYear?: Observable<number | undefined>;

  public readonly heatingSources: HeatingSource[] = [
    {
      value: HeatingSourceEnum.coalFiredBoiler,
      description: 'Kocioł na węgiel',
    },
    {
      value: HeatingSourceEnum.condensingGasBoiler,
      description: 'Kondensacyjny kocioł gazowy',
    },
    {
      value: HeatingSourceEnum.convGasBoiler,
      description: 'Atmosferyczny kocioł gazowy',
    },
    {
      value: HeatingSourceEnum.electricHeater,
      description: 'Elektryczny piec',
    },
    {
      value: HeatingSourceEnum.biomassBoiler,
      description: 'Kocioł na biomasę',
    },
  ];

  public readonly familyMemberNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  public ngOnInit(): void {
    this.streets = this.streetProvider
      .streets$()
      .pipe(
        mergeMap((streets) =>
          this.streetInput?.valueChanges.pipe(
            map((street) => this.filter(street, streets))
          )
        )
      );
    const heatSources$ = this.streetInput.valueChanges.pipe(
      map((street) => this.heatSourcesService.checkStreetHeatSources(street)),
      shareReplay(1)
    );

    this.isGasAvailable = heatSources$.pipe(map((p) => p.gasNetworkAvailable));
    this.gasPlannedYear = heatSources$.pipe(map((p) => p.gasNetworkPlanedOn));

    this.isHeatingPlantAvailable = heatSources$.pipe(
      map((p) => p.heatingPlantAvailable)
    );

    this.heatingPlannedYear = heatSources$.pipe(
      map((p) => p.heatingPlantPlannedOn)
    );
  }

  private filter(value: string, streets: string[]): string[] {
    const filterValue = value.toLowerCase();
    return streets.filter((street) =>
      street.toLowerCase().includes(filterValue)
    );
  }

  public submitForm() {
    this.formSubmitted.next(this.calculatorForm.value);
  }

  public thermalInsulationTooltip() {
    return 'Słabo ocieplony - brak ocieplenia, stara zabudowa lub ocieplenie na poziomie niższym niż 10cm styropianu.\n\nDobrze ocieplony - ocieplenie na poziomie 10-15cm styropianu i/lub wymieniona stolarka okienna.\n\nBardzo dobrze ocieplony - ocieplenie na poziomie wyższym niż 15cm styropianu i wymieniona stolarka okienna';
  }
}
