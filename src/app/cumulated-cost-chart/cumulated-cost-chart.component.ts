import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, map, mergeMap } from 'rxjs/operators';
import { ICost, CostProviderService } from '../cost-provider.service';
import { HouseSizeEnum } from '../models/house-size.enum';
@Component({
  selector: 'app-cumulated-cost-chart',
  templateUrl: './cumulated-cost-chart.component.html',
  styleUrls: ['./cumulated-cost-chart.component.scss'],
})
export class CumulatedCostChartComponent {
  houseSize$ = new BehaviorSubject<HouseSizeEnum>(HouseSizeEnum.medium);
  @Input()
  set houseSize(size: HouseSizeEnum) {
    this.houseSize$.next(size);
  }
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
  xAxisLabel: string = 'Rok';
  yAxisLabel: string = 'Koszt w PLN';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

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
              series: this.years.map((year) => ({
                name: year.toString(),
                value:
                  this.costProvider.getYearlyAverage(c, houseSize) * year +
                  this.costProvider.getInstalationCost(c, houseSize),
              })),
            }))
          )
        )
      )
    );
  }
}
