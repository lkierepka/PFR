import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConnectedStreet } from '../models/connected-street-model';

@Injectable({
  providedIn: 'root'
})
export class HeatingPlantStreetProviderService {
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
    this.heatingPlantStreet$().subscribe(
      streets => {
        this.connectedStreets.next(this.sortByName(streets));
        console.log('initialized correctly');
      },
      error => {
        console.log(error);
      }
    );
  }

  public heatingPlantStreet$(): Observable<ConnectedStreet[]> {
    const file$ = this.http.get<ConnectedStreet[]>('../../assets/heat.json');
    return file$.pipe(tap(console.log));
  }

  private sortByName(items: ConnectedStreet[]): ConnectedStreet[] {
    return items.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  public reloadStreetsAsync(): Observable<ConnectedStreet[]> {
    return this.reloadStreetsAsync().pipe(
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
