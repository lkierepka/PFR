import { Component, OnInit } from '@angular/core';
import { CostProviderService } from '../cost-provider.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
})
export class CalculatorFormComponent implements OnInit {
  constructor(private costProvider: CostProviderService) {}

  public ngOnInit(): void {}
}
