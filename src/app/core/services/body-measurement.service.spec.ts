import { TestBed } from '@angular/core/testing';

import { BodyMeasurementService } from './body-measurement.service';

describe('BodyMeasurementService', () => {
  let service: BodyMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
