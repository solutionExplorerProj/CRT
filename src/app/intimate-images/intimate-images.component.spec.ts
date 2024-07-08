import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntimateImagesComponent } from './intimate-images.component';

describe('IntimateImagesComponent', () => {
  let component: IntimateImagesComponent;
  let fixture: ComponentFixture<IntimateImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntimateImagesComponent]
    });
    fixture = TestBed.createComponent(IntimateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
