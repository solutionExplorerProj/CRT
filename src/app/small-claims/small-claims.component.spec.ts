import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallClaimsComponent } from './small-claims.component';

describe('SmallClaimsComponent', () => {
  let component: SmallClaimsComponent;
  let fixture: ComponentFixture<SmallClaimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallClaimsComponent]
    });
    fixture = TestBed.createComponent(SmallClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
