import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMeasurementFormComponent } from './body-measurement-form.component';

describe('BodyMeasurementFormComponent', () => {
  let component: BodyMeasurementFormComponent;
  let fixture: ComponentFixture<BodyMeasurementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyMeasurementFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyMeasurementFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
