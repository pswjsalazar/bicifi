import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../../commons/models/plan";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  values: any = [{name: 'Aprobado'}, {name: 'Pendiente'}, {name: 'Rechazado'}];
  plan = new Plan();
  editView = false;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.activeModal.dismiss({plan: this.plan});
  }

  // addRow() {
  //   this.plan.project.push({name: ''});
  //   this.plan.metrics.push({name: ''});
  //   this.plan.who.push({name: ''});
  //   this.plan.when.push({name: ''});
  //   this.plan.state.push({name: ''});
  // }
}
