import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietiesAndCooperativeAssociationsComponent } from './societies-and-cooperative-associations.component';

describe('SocietiesAndCooperativeAssociationsComponent', () => {
  let component: SocietiesAndCooperativeAssociationsComponent;
  let fixture: ComponentFixture<SocietiesAndCooperativeAssociationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocietiesAndCooperativeAssociationsComponent]
    });
    fixture = TestBed.createComponent(SocietiesAndCooperativeAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
