import {Component, Input, OnInit} from '@angular/core';
import {CanalDetail} from '../../../../../commons/models/canalDetail';
import {IntermediaryChannel} from '../../../../../commons/models/intermediaryChannel';

@Component({
  selector: 'app-step-segment',
  templateUrl: './step-segment.component.html',
  styleUrls: ['./step-segment.component.css']
})
export class StepSegmentComponent implements OnInit {
  @Input() items: Array<IntermediaryChannel>;
  @Input() smallView: boolean;
  stepSegment = new IntermediaryChannel();
  width = {width: '500px'};

  constructor() {
  }

  ngOnInit(): void {
  }

  addCanalDetail(canals: CanalDetail[]): void {
    canals.push(new CanalDetail());
  }

  save(stepSegment: IntermediaryChannel): void {
    stepSegment.smallView = true;
  }

  edit(stepSegment: IntermediaryChannel): void {
    stepSegment.smallView = false;
    console.log(stepSegment);
  }
}
