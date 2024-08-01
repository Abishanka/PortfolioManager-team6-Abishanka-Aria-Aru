import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondpageComponent } from './bondpage.component';

describe('BondpageComponent', () => {
  let component: BondpageComponent;
  let fixture: ComponentFixture<BondpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
