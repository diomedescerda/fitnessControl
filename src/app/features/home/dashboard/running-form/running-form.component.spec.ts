import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningFormComponent } from './running-form.component';

describe('RunningFormComponent', () => {
  let component: RunningFormComponent;
  let fixture: ComponentFixture<RunningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RunningFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
