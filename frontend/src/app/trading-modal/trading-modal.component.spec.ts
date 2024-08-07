import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingModalComponent } from './trading-modal.component';

describe('TradingModalComponent', () => {
  let component: TradingModalComponent;
  let fixture: ComponentFixture<TradingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
