import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface ICost {
  nazwa: string;
  instalacja: {
    zewnetrzna: {
      min: number;
      max: number;
    };
    wewnetrzna: {
      max100m: {
        avg: number;
      };
      max200m: {
        avg: number;
      };
      min200m: {
        avg: number;
      };
    };
    kociol: {
      max100m: {
        avg: number;
      };
      max200m: {
        avg: number;
      };
      min200m: {
        avg: number;
      };
    };
  };
  sredniRoczny: {
    max100m: {
      min: number;
      max: number;
    };
    max200m: {
      min: number;
      max: number;
    };
    min200m: {
      min: number;
      max: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class CostProviderService {
  constructor(private http: HttpClient) {}

  public costs$() {
    const file$ = this.http.get('/assets/Koszty.csv', { responseType: 'text' });
    return file$.pipe(
      map((response) => {
        const rows = response.split('\n');
        rows.splice(0, 3);
        return rows.map(this.mapRowToCost);
      })
    );
  }

  private mapRowToCost(value: string): ICost {
    const row = value.split(',');
    return {
      nazwa: row[0],
      instalacja: {
        zewnetrzna: {
          min: Number.parseInt(row[1]),
          max: Number.parseInt(row[2]),
        },
        wewnetrzna: {
          max100m: { avg: Number.parseInt(row[3]) },
          max200m: { avg: Number.parseInt(row[4]) },
          min200m: { avg: Number.parseInt(row[5]) },
        },
        kociol: {
          max100m: { avg: Number.parseInt(row[6]) },
          max200m: { avg: Number.parseInt(row[7]) },
          min200m: { avg: Number.parseInt(row[8]) },
        },
      },
      sredniRoczny: {
        max100m: {
          min: Number.parseInt(row[9]),
          max: Number.parseInt(row[10]),
        },
        max200m: {
          min: Number.parseInt(row[11]),
          max: Number.parseInt(row[12]),
        },
        min200m: {
          min: Number.parseInt(row[13]),
          max: Number.parseInt(row[14]),
        },
      },
    };
  }
}
