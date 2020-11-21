import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CalculatorFormValue } from './calculator-form/calculator-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('stepper')
  private myStepper?: MatStepper;

  public formValue?: CalculatorFormValue;

  title = 'PFR';
  public isInitialized: boolean = false;

  public initializePage() {
    this.isInitialized = true;
  }

  public onFormSubmitted(formValue: CalculatorFormValue) {
    this.formValue = formValue;
    this.myStepper?.next();
  }
}
