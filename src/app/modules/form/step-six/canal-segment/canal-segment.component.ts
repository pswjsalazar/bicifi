import {Component, Input, OnInit} from '@angular/core';
import {CanalSegment} from '../../../../commons/models/canalSegment';
import {IntermediaryChannel} from '../../../../commons/models/intermediaryChannel';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CanalDetail} from "../../../../commons/models/canalDetail";

@Component({
  selector: 'app-canal-segment',
  templateUrl: './canal-segment.component.html',
  styleUrls: ['./canal-segment.component.css']
})
export class CanalSegmentComponent implements OnInit {
  @Input() items: Array<CanalSegment>;
  @Input() smallView: boolean;
  canalSegment = new CanalSegment();
  editView = false;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal) {
    this.canalSegment.intermediaryChannel = [];
  }

  ngOnInit(): void {
  }

  addStep(): void {
    console.log('add');
    const stepSegment = new IntermediaryChannel();
    stepSegment.canalDetail = [];
    stepSegment.canalDetail.push(new CanalDetail());
    this.canalSegment.intermediaryChannel.push(stepSegment);
  }

  addDemandGenerationTechniques(): void {
    this.canalSegment.demandGenerationTechniques.push({name: ''});
  }

  save(): void {
    this.activeModal.dismiss({canalSegment: this.canalSegment});
  }

  edit(segment: CanalSegment): void {
    const modalRef = this.modalService.open(CanalSegmentComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.canalSegment = segment;
    modalRef.componentInstance.editView = true;
  }
}
