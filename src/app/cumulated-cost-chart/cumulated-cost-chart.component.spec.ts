import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulatedCostChartComponent } from './cumulated-cost-chart.component';

describe('CumulatedCostChartComponent', () => {
  let component: CumulatedCostChartComponent;
  let fixture: ComponentFixture<CumulatedCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulatedCostChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulatedCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
