import {Component, OnInit} from '@angular/core';
import {KeyCustomers} from '../../../commons/models/keyCustomers';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.css']
})
export class StepSevenComponent implements OnInit {
  keyCustomersList: Array<KeyCustomers>;
  sols = [{label: 'Sol #'}];
  scale = 0.8;


  constructor(private firebaseService: FirebaseService) {
    this.keyCustomersList = [];
    this.keyCustomersList.push(new KeyCustomers());
  }

  ngOnInit(): void {
    this.getForm();
  }

  addRow(): void {
    const keyCustomer = new KeyCustomers();
    keyCustomer.sol = [];
    this.sols.forEach((value, index) => {
      keyCustomer.sol.push({sol: '', index});
    });
    this.keyCustomersList.push(keyCustomer);
  }

  addColumnSales(index: number): void {
    this.sols.push({label: 'Sol #'});
    this.keyCustomersList.forEach((value) => {
      value.sol.push({sol: '', index: index + 1});
    });
    this.keyCustomersList.forEach((value) => {
      value.sol = value.sol.sort((a, b) => {
        return a.index - b.index;
      });
    });
  }

  save(): void {
    this.keyCustomersList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.keyCustomers, value).then(() => {
          if (index + 1 === this.keyCustomersList.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.keyCustomers, value.id, value)
          .then(() => {
            if (index === this.keyCustomersList.length) {
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

  totalCustomerSale(keyCustomers: KeyCustomers): number {
    let total = 0;
    keyCustomers.sol.forEach(value => {
      total = total + Number(value.sol);
    });
    return total;
  }

  totalSol(index: number): number {
    let total = 0;
    this.keyCustomersList.forEach(value => {
      total = total + Number(value.sol[index].sol);
    });
    return total;
  }

  totalProduct(): number {
    let total = 0;
    this.keyCustomersList.forEach(keyCustomer => {
      keyCustomer.sol.forEach(sol => {
        total = total + Number(sol.sol);
      });
    });
    return total;
  }

  private getForm(): void {
    this.firebaseService.getAll(FirebasePath.keyCustomers).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as KeyCustomers})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.keyCustomersList = data.sort((a, b) => {
          return a.index - b.index;
        });
        this.sols = [];
        this.keyCustomersList[0].sol.forEach(() => {
          this.sols.push({label: 'Sol #'});
        });
      }
    });
  }
}
