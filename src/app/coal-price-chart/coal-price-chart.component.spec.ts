import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalPriceChartComponent } from './coal-price-chart.component';

describe('CoalPriceChartComponent', () => {
  let component: CoalPriceChartComponent;
  let fixture: ComponentFixture<CoalPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoalPriceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
