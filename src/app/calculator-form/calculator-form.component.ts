import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StreetProviderService } from '../street-provider.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
})
export class CalculatorFormComponent implements OnInit {
  streetInput = new FormControl();
  constructor(public streetProvider: StreetProviderService) { }

  public streets?: Observable<string[]>;

  public ngOnInit(): void {
    this.streets = this.streetProvider.streets$().pipe(mergeMap(streets =>
      this.streetInput?.valueChanges.pipe(map(street => this.filter(street, streets)))));
  }

  private filter(value: string, streets: string[]): string[] {
    const filterValue = value.toLowerCase();
    return streets.filter(street => street.toLowerCase().includes(filterValue));
  }
}
