import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantSummaryComponent } from './grant-summary.component';

describe('GrantSummaryComponent', () => {
  let component: GrantSummaryComponent;
  let fixture: ComponentFixture<GrantSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
