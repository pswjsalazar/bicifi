import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../commons/models/plan";
import {FirebaseService} from "../../../commons/services/firebase.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PlanComponent} from "./plan/plan.component";
import {FirebasePath} from "../../../commons/globals/firebasePath";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-step-nine',
  templateUrl: './step-nine.component.html',
  styleUrls: ['./step-nine.component.css']
})
export class StepNineComponent implements OnInit {
  scale = 0.8;
  plans: Array<Plan> = [];

  constructor(private firebaseService: FirebaseService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPlans();
  }

  save(): void {
    console.log(this.plans);
    this.plans.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index + 1;
        this.firebaseService.create(FirebasePath.plans, value).then(() => {
          if (index + 1 === this.plans.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.plans, value.id, value)
          .then(() => {
            if (index + 1 === this.plans.length) {
              alert('The status was updated successfully!');
            }
          })
          .catch(err => {
            alert('Error updated: ' + value);
            console.log(err);
          });
      }
    });
  }

  addPlan(): void {
    const modalRef = this.modalService.open(PlanComponent, {
      size: 'xl'
    });
    modalRef.result.catch(reason => {
      if (reason !== 0 && reason !== 1) {
        console.log(reason.plan);
        this.plans.push(reason.plan);
      }
    });
  }

  private getPlans(): void {
    this.firebaseService.getAll(FirebasePath.plans).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as Plan})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.plans = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }

  edit(plan: Plan): void {
    const modalRef = this.modalService.open(PlanComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.plan = plan;
    modalRef.componentInstance.editView = true;
  }
}
