import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloalSearchComponent } from './gloal-search.component';

describe('GloalSearchComponent', () => {
  let component: GloalSearchComponent;
  let fixture: ComponentFixture<GloalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GloalSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GloalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
