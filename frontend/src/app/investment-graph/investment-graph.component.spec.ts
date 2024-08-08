import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsComponent } from './investment-graph.component';

describe('InvestmentGraphComponent', () => {
  let component: InvestmentsComponent;
  let fixture: ComponentFixture<InvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
