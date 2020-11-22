import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, mergeMap, map } from 'rxjs/operators';
import { ICost, CostProviderService } from '../cost-provider.service';
import { HouseSizeEnum } from '../models/house-size.enum';

@Component({
  selector: 'app-installation-cost-chart',
  templateUrl: './installation-cost-chart.component.html',
  styleUrls: ['./installation-cost-chart.component.scss'],
})
export class InstallationCostChartComponent {
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
              value: this.costProvider.getInstalationCost(c, houseSize),
            }))
          )
        )
      )
    );
  }
}
