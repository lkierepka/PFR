import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationCostChartComponent } from './installation-cost-chart.component';

describe('InstallationCostChartComponent', () => {
  let component: InstallationCostChartComponent;
  let fixture: ComponentFixture<InstallationCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationCostChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
