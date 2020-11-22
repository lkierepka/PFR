import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { GasPipelineStreetProviderService } from './services/gas-pipeline-availability-provider.service';
import { HeatingPlantStreetProviderService } from './services/heating-plant-availability-provider.service';
import { StreetProviderService } from './street-provider.service';
import { CostProviderService } from './cost-provider.service';
import { AverageYearlyCostChartComponent } from './average-yearly-cost-chart/average-yearly-cost-chart.component';
import { CoalPriceChartComponent } from './coal-price-chart/coal-price-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GrantSummaryComponent } from './grant-summary/grant-summary.component';
import { ResultsComponent } from './results/results.component';
import { MatCardModule } from '@angular/material/card';
import { CumulatedCostChartComponent } from './cumulated-cost-chart/cumulated-cost-chart.component';
import { GrantInformationComponent } from './grant-summary/grant-information/grant-information.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorFormComponent,
    AverageYearlyCostChartComponent,
    CoalPriceChartComponent,
    GrantSummaryComponent,
    ResultsComponent,
    CumulatedCostChartComponent,
    GrantInformationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    OverlayModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,
    MatIconModule,
    NgxChartsModule,
    FormsModule,
  ],
  providers: [
    GasPipelineStreetProviderService,
    HeatingPlantStreetProviderService,
    StreetProviderService,
    CostProviderService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
