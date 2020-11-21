import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CoalPriceService, ICoalPrice } from '../coal-price.service';

@Component({
  selector: 'app-coal-price-chart',
  templateUrl: './coal-price-chart.component.html',
  styleUrls: ['./coal-price-chart.component.scss'],
})
export class CoalPriceChartComponent implements OnInit {
  coalPrices$: Observable<ICoalPrice[]>;
  coalPricesSeries$: Observable<
    { name: string; series: { name: string; value: number }[] }[]
  >;
  coalPriceMinScale$: Observable<number>;
  coalPriceMaxScale$: Observable<number>;
  view: [number, number] = [500, 300];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Rok';
  yAxisLabel: string = 'Cena węgla w PLN';

  constructor(private coalPriceService: CoalPriceService) {
    this.coalPrices$ = this.coalPriceService.coalPrices$().pipe(shareReplay());
    this.coalPricesSeries$ = this.coalPrices$.pipe(
      map((prices) => [
        {
          name: 'Cena węgla',
          series: prices.map((p) => ({
            name: p.year.toString(),
            value: p.price,
          })),
        },
      ])
    );
    this.coalPriceMinScale$ = this.coalPrices$.pipe(
      map(
        (prices) =>
          prices
            .map((p) => p.price)
            .reduce((min, current) => Math.min(min, current)) - 100
      )
    );
    this.coalPriceMaxScale$ = this.coalPrices$.pipe(
      map(
        (prices) =>
          prices
            .map((p) => p.price)
            .reduce((max, current) => Math.max(max, current)) + 100
      )
    );
  }

  ngOnInit(): void {}
}
