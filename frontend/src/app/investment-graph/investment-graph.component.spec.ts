import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentGraphComponent } from './investment-graph.component';

describe('InvestmentGraphComponent', () => {
  let component: InvestmentGraphComponent;
  let fixture: ComponentFixture<InvestmentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
