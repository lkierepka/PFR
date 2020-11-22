import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HeatingSourceEnum } from '../calculator-form/heating-source.enum';
import { HeatingSource } from '../calculator-form/i-heating-source';
import { CostProviderService, ICost } from '../cost-provider.service';
import { HouseSizeEnum } from '../models/house-size.enum';

@Component({
  selector: 'app-grant-summary',
  templateUrl: './grant-summary.component.html',
  styleUrls: ['./grant-summary.component.scss']
})
export class GrantSummaryComponent implements OnInit {

  public readonly heatingSourcesToApply: HeatingSource[] = [
    { value: HeatingSourceEnum.convGasBoiler, description: 'Gaz z sieci' },
    { value: HeatingSourceEnum.condensingGasBoiler, description: 'Gaz ze zbiornika' },
    { value: HeatingSourceEnum.biomassBoiler, description: 'Biomasa' },
    { value: HeatingSourceEnum.electricHeater, description: 'Energia elektryczna' },
    { value: HeatingSourceEnum.districtHeating, description: 'Ciepło sieciowe' }
  ];
  public selectedSource: any;

  constructor() {

  }

  ngOnInit(): void {
  }



}
