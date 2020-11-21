import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageYearlyCostChartComponent } from './average-yearly-cost-chart.component';

describe('AverageYearlyCostChartComponent', () => {
  let component: AverageYearlyCostChartComponent;
  let fixture: ComponentFixture<AverageYearlyCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageYearlyCostChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageYearlyCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
