import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDealComponent } from './cancel-deal.component';

describe('CancelDealComponent', () => {
  let component: CancelDealComponent;
  let fixture: ComponentFixture<CancelDealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelDealComponent]
    });
    fixture = TestBed.createComponent(CancelDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
