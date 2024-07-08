import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAccidentsComponent } from './vehicle-accidents.component';

describe('VehicleAccidentsComponent', () => {
  let component: VehicleAccidentsComponent;
  let fixture: ComponentFixture<VehicleAccidentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleAccidentsComponent]
    });
    fixture = TestBed.createComponent(VehicleAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
