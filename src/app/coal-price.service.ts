import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ICoalPrice {
  year: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoalPriceService {
  constructor(private http: HttpClient) {}

  public coalPrices$() {
    return this.http.get<ICoalPrice[]>('/assets/coal_avg.json');
  }
}
