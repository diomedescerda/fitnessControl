import { TestBed } from '@angular/core/testing';

import { RunningSessionService } from './running-session.service';

describe('RunningSessionService', () => {
  let service: RunningSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunningSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
