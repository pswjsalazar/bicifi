import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CanalSegmentComponent} from './canal-segment.component';

describe('CanalSegmentComponent', () => {
  let component: CanalSegmentComponent;
  let fixture: ComponentFixture<CanalSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanalSegmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
