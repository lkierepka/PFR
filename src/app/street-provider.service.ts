import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreetProviderService {

  constructor(private http: HttpClient) { }

  public streets$(): Observable<string[]> {
    const file$ = this.http.get<string[]>('/assets/streets.json');
    return file$.pipe(tap(console.log));
  }
}
