import {Component, OnInit} from '@angular/core';
import {EntrepreneurshipPrioritize} from '../../../commons/models/entrepreneurship-prioritize';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {Header} from '../../../commons/models/header';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  headElements: Array<Header>;
  colspan: any;
  entrepreneurshipPrioritizeList: Array<EntrepreneurshipPrioritize>;
  scale = 0.8;

  constructor(private firebaseService: FirebaseService) {
    this.headElements = [];
    this.headElements.push(new Header());
    this.colspan = this.headElements.length;
    this.entrepreneurshipPrioritizeList = [];
    const entrepreneurshipPrioritize = new EntrepreneurshipPrioritize();
    entrepreneurshipPrioritize.labelYear = [{labelYear: ''}];
    this.entrepreneurshipPrioritizeList.push(entrepreneurshipPrioritize);
  }

  ngOnInit(): void {
    this.getForm();
    this.getHeader();
  }

  addRow(): void {
    const entrepreneurshipPrioritize = new EntrepreneurshipPrioritize();
    this.headElements.forEach(() => {
      entrepreneurshipPrioritize.labelYear.push({labelYear: ''});
    });
    this.entrepreneurshipPrioritizeList.push(entrepreneurshipPrioritize);
  }

  addColumn(): void {
    this.colspan = this.headElements.length + 1;
    this.headElements.push({columnName: ''});
    this.entrepreneurshipPrioritizeList.forEach(value => {
      value.labelYear.push({labelYear: ''});
    });
  }

  removeRow(): void {
    this.entrepreneurshipPrioritizeList.pop();
  }

  removeColumn(): void {
    this.colspan = this.headElements.length - 1;
    this.headElements.pop();
    this.entrepreneurshipPrioritizeList.forEach(value => value.labelYear.pop());
  }

  save(): void {
    this.saveForm();
    this.saveHeader();
  }

  totalValue(column: number): number {
    if (this.entrepreneurshipPrioritizeList.length > 0) {
      let total = 0;
      this.entrepreneurshipPrioritizeList.forEach(value => {
        value.labelYear.forEach((labelYear, index) => {
          if (column === index) {
            total = total + Number(labelYear.labelYear);
          }
        });
      });
      return total;
    } else {
      return 0;
    }
  }

  private getForm(): void {
    this.firebaseService.getAll(FirebasePath.entrepreneurshipPrioritize).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as EntrepreneurshipPrioritize})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.entrepreneurshipPrioritizeList = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }

  private saveForm(): void {
    this.entrepreneurshipPrioritizeList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index + 1;
        this.firebaseService.create(FirebasePath.entrepreneurshipPrioritize, value).then(() => {
          if (index + 1 === this.entrepreneurshipPrioritizeList.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.entrepreneurshipPrioritize, value.id, value)
          .then(() => {
            if (index === this.entrepreneurshipPrioritizeList.length) {
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

  private saveHeader(): void {
    this.headElements.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index + 1;
        this.firebaseService.create(FirebasePath.entrepreneurshipPrioritizeHeader, value).then(() => {
          if (index + 1 === this.headElements.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.entrepreneurshipPrioritizeHeader, value.id, value)
          .then(() => {
            if (index === this.headElements.length) {
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

  private getHeader(): void {
    this.firebaseService.getAll(FirebasePath.entrepreneurshipPrioritizeHeader).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as Header})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.headElements = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }
}
