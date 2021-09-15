import {Component, OnInit} from '@angular/core';
import {Segment} from '../../../commons/models/segment';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SegmentComponent} from "./segment/segment.component";

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {
  items: Array<Segment> = [];

  constructor(private firebaseService: FirebaseService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getSegments();
  }

  addSegment(): void {
    const modalRef = this.modalService.open(SegmentComponent, {
      size: 'xl'
    });
    modalRef.result.catch(reason => {
      if (reason !== 0 && reason !== 1) {
        this.items.push(reason.segment);
      }
    });
  }

  save(): void {
    this.items.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index + 1;
        this.firebaseService.create(FirebasePath.productPortfolio, value).then(() => {
          if (index + 1 === this.items.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.productPortfolio, value.id, value)
          .then(() => {
            if (index + 1 === this.items.length) {
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

  private getSegments(): void {
    this.firebaseService.getAll(FirebasePath.productPortfolio).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as Segment})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.items = data.sort((a, b) => {
          return a.index - b.index;
        });
        console.log(this.items);
      }
    });
  }
}
