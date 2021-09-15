import {Component, Input, OnInit} from '@angular/core';
import {Segment} from '../../../../commons/models/segment';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
  @Input() items: Array<Segment>;
  @Input() smallView: boolean;
  values: any = [{name: 'Top'}, {name: 'Mejor'}, {name: 'Bueno'}];
  segment = new Segment();
  editView = false;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  save(): void {
    this.activeModal.dismiss({segment: this.segment});
  }

  edit(segment: Segment): void {
    const modalRef = this.modalService.open(SegmentComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.segment = segment;
    modalRef.componentInstance.editView = true;
  }
}
