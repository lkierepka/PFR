import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface ICost {
  name: string;
  installation: {
    external: {
      min: number;
      max: number;
    };
    internal: {
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
    cauldron: {
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
  yearlyAvg: {
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
    const file$ = this.http.get('/assets/costs.csv', { responseType: 'text' });
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
    const name = row.splice(0, 1)[0];
    const rowNumbers = row.map(Number.parseInt);
    return {
      name: name,
      installation: {
        external: {
          min: rowNumbers[0],
          max: rowNumbers[1],
        },
        internal: {
          max100m: { avg: rowNumbers[2] },
          max200m: { avg: rowNumbers[3] },
          min200m: { avg: rowNumbers[4] },
        },
        cauldron: {
          max100m: { avg: rowNumbers[5] },
          max200m: { avg: rowNumbers[6] },
          min200m: { avg: rowNumbers[7] },
        },
      },
      yearlyAvg: {
        max100m: {
          min: rowNumbers[8],
          max: rowNumbers[9],
        },
        max200m: {
          min: rowNumbers[10],
          max: rowNumbers[11],
        },
        min200m: {
          min: rowNumbers[12],
          max: rowNumbers[13],
        },
      },
    };
  }
}
