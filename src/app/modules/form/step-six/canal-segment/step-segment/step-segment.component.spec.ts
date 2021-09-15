import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepSegmentComponent} from './step-segment.component';

describe('StepSegmentComponent', () => {
  let component: StepSegmentComponent;
  let fixture: ComponentFixture<StepSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepSegmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
