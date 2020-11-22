import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { CostProviderService, ICost } from '../cost-provider.service';
import { HouseSizeEnum } from '../models/house-size.enum';

@Component({
  selector: 'app-average-yearly-cost-chart',
  templateUrl: './average-yearly-cost-chart.component.html',
  styleUrls: ['./average-yearly-cost-chart.component.scss'],
})
export class AverageYearlyCostChartComponent {
  houseSize$ = new BehaviorSubject<HouseSizeEnum>(HouseSizeEnum.medium);
  @Input()
  set houseSize(size: HouseSizeEnum) {
    this.houseSize$.next(size);
  }
  @Input()
  years: number = 10;
  costs$: Observable<ICost[]>;
  costsSeries$: Observable<{ name: string; value: number }[]>;

  view: any[] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Źródła ogrzewania';
  showYAxisLabel = true;
  yAxisLabel = 'Koszt w PLN';
  barPadding = 10;
  showLegend = true;
  legendTitle = 'Legenda';

  colorScheme = {
    domain: ['#5AA454', '#7AA3E5', '#F2DFA7', '#A27EA8', '#A8385D'],
  };
  constructor(private costProvider: CostProviderService) {
    this.costs$ = this.costProvider.costs$().pipe(shareReplay());
    this.costsSeries$ = this.costs$.pipe(
      mergeMap((costs) =>
        this.houseSize$.pipe(
          map((houseSize) =>
            costs.map((c) => ({
              name: c.name,
              value: this.costProvider.getYearlyAverage(c, houseSize),
            }))
          )
        )
      )
    );
  }
}
