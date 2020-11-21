import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import {
  CostProviderService,
  ICost,
  IHouseSizeAvg,
  IHouseSizeMinMax,
  IMinMax,
} from '../cost-provider.service';

@Component({
  selector: 'app-average-yearly-cost-chart',
  templateUrl: './average-yearly-cost-chart.component.html',
  styleUrls: ['./average-yearly-cost-chart.component.scss'],
})
export class AverageYearlyCostChartComponent {
  @Input()
  houseSize: string = 'average';
  @Input()
  years: number = 10;
  costs$: Observable<ICost[]>;
  costsSeries$: Observable<{ name: string; value: number }[]>;

  view: any[] = [500, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Źródła ogrzewania';
  showYAxisLabel = true;
  yAxisLabel = 'Koszt w PLN';
  barPadding = 10

  colorScheme = {
    domain: ['#5AA454', '#7AA3E5', '#F2DFA7', '#A27EA8', '#A8385D'],
  };
  constructor(private costProvider: CostProviderService) {
    this.costs$ = this.costProvider.costs$().pipe(shareReplay());
    this.costsSeries$ = this.costs$.pipe(
      map((costs) =>
        costs.map((c) => ({
          name: c.name,
          value:
            this.getAvgFromMinMax(this.getValueForSizeMinMax(c.yearlyAvg)) +
            this.getInstalationCost(c) / this.years,
        }))
      )
    );
  }

  getInstalationCost(c: ICost): number {
    return (
      this.getValueForSizeAvg(c.installation.cauldron).avg +
      this.getAvgFromMinMax(c.installation.external) +
      this.getValueForSizeAvg(c.installation.internal).avg
    );
  }

  getValueForSizeAvg(size: IHouseSizeAvg) {
    switch (this.houseSize) {
      case 'small':
        return size.max100m;
      case 'average':
      default:
        return size.max200m;
      case 'large':
        return size.min200m;
    }
  }

  getValueForSizeMinMax(size: IHouseSizeMinMax) {
    switch (this.houseSize) {
      case 'small':
        return size.max100m;
      case 'average':
      default:
        return size.max200m;
      case 'large':
        return size.min200m;
    }
  }

  getAvgFromMinMax(minMax: IMinMax) {
    return (minMax.min + minMax.max) / 2;
  }
}
