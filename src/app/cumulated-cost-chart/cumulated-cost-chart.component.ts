import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import {
  ICost,
  CostProviderService,
  IHouseSizeAvg,
  IHouseSizeMinMax,
  IMinMax,
} from '../cost-provider.service';
@Component({
  selector: 'app-cumulated-cost-chart',
  templateUrl: './cumulated-cost-chart.component.html',
  styleUrls: ['./cumulated-cost-chart.component.scss'],
})
export class CumulatedCostChartComponent {
  @Input()
  houseSize: string = 'average';
  @Input()
  years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  costs$: Observable<ICost[]>;
  costsSeries$: Observable<
    { name: string; series: { name: string; value: number }[] }[]
  >;

  view: any[] = [700, 400];

  // options
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel: string = 'Lata';
  yAxisLabel: string = 'Koszt w PLN';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  constructor(private costProvider: CostProviderService) {
    this.costs$ = this.costProvider.costs$().pipe(shareReplay());
    this.costsSeries$ = this.costs$.pipe(
      map((costs) =>
        costs.map((c) => ({
          name: c.name,
          series: this.years.map((year) => ({
            name: year.toString(),
            value:
              this.getAvgFromMinMax(this.getValueForSizeMinMax(c.yearlyAvg)) *
                year +
              this.getInstalationCost(c),
          })),
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
