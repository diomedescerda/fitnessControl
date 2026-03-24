import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningGraphs } from './running-graphs';

describe('RunningGraphs', () => {
  let component: RunningGraphs;
  let fixture: ComponentFixture<RunningGraphs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningGraphs],
    }).compileComponents();

    fixture = TestBed.createComponent(RunningGraphs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
