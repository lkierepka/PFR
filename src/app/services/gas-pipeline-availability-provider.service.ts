import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConnectedStreet } from '../models/connected-street-model';

@Injectable({
  providedIn: 'root'
})
export class GasPipelineStreetProviderService {
  private connectedStreets: BehaviorSubject<
    ConnectedStreet[]
  > = new BehaviorSubject<ConnectedStreet[]>([]);

  public readonly ConnectedStreets: Observable<
    ConnectedStreet[]
  > = this.connectedStreets.asObservable();

  constructor(private http: HttpClient) {
    this.initializeStreets();
  }

  private initializeStreets() {
    this.gasPipelineStreet$().subscribe(
      streets => {
        this.connectedStreets.next(this.sortByName(streets));
        console.log('initialized correctly');
      },
      error => {
        console.log(error);
      }
    );
  }

  public gasPipelineStreet$(): Observable<ConnectedStreet[]> {
    const file$ = this.http.get<ConnectedStreet[]>('../../assets/gas.json');
    return file$.pipe(tap(console.log));
  }

  private sortByName(items: ConnectedStreet[]): ConnectedStreet[] {
    return items.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  public reloadStreetsAsync(): Observable<ConnectedStreet[]> {
    return this.gasPipelineStreet$().pipe(
      catchError(error => {
        console.log(error);
        throw error;
      }),
      tap((markets: ConnectedStreet[]) =>
        this.connectedStreets.next(this.sortByName(markets))
      )
    );
  }
}
