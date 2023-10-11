import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDealComponent } from './claim-deal.component';

describe('ClaimDealComponent', () => {
  let component: ClaimDealComponent;
  let fixture: ComponentFixture<ClaimDealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimDealComponent]
    });
    fixture = TestBed.createComponent(ClaimDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
