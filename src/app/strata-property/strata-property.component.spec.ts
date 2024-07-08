import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrataPropertyComponent } from './strata-property.component';

describe('StrataPropertyComponent', () => {
  let component: StrataPropertyComponent;
  let fixture: ComponentFixture<StrataPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrataPropertyComponent]
    });
    fixture = TestBed.createComponent(StrataPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
