import {Component, OnInit} from '@angular/core';
import {KeyProductPricePlan} from '../../../commons/models/keyProductPricePlan';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {map} from 'rxjs/operators';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {Header} from '../../../commons/models/header';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-step-eight',
  templateUrl: './step-eight.component.html',
  styleUrls: ['./step-eight.component.css']
})
export class StepEightComponent implements OnInit {

  scale = 0.8;
  constructor(private firebaseService: FirebaseService) {
    this.keyProductPricePlanList = [];
    this.keyProductPricePlanList.push(new KeyProductPricePlan());
    this.headerColumn = [];
    this.headerColumn.push(new Header());
  }

  keyProductPricePlanList: Array<KeyProductPricePlan>;
  headerColumn: Array<Header>;
  date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };
  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        {x: 1, y: 1},
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  ngOnInit(): void {
    this.getForm();
    this.getHeader();
  }

  addColumn(index: number): void {
    this.headerColumn.push(new Header());
    this.keyProductPricePlanList.forEach(value => {
      value.product.push({evaluationEachCharacteristic: '', index: index + 1});
    });
    this.keyProductPricePlanList.forEach((value) => {
      value.product = value.product.sort((a, b) => {
        return a.index - b.index;
      });
    });
  }

  addRow(): void {
    const keyProductPricePlan = new KeyProductPricePlan();
    keyProductPricePlan.product = [];
    this.headerColumn.forEach((value, index) => {
      keyProductPricePlan.product.push({evaluationEachCharacteristic: '', index});
    });
    this.keyProductPricePlanList.push(keyProductPricePlan);
  }

  save(): void {
    this.saveHeader();
    this.saveBody();
  }

  getWeighTotal(): number {
    let total = 0;
    this.keyProductPricePlanList.forEach(value => {
      total = total + Number(value.weightImportanceClient);
    });
    return Number(total.toFixed(2));
  }

  getScoreTotal(index: number): number {
    let total = 0;
    this.keyProductPricePlanList.forEach(keyProductPricePlan => {
      total = total + Number(Number(keyProductPricePlan.weightImportanceClient)
        * Number(keyProductPricePlan.product[index].evaluationEachCharacteristic) / 100);
    });
    return Number(total.toFixed(2));
  }

  private getForm(): void {
    this.firebaseService.getAll(FirebasePath.keyProductPricePlan).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as KeyProductPricePlan})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.keyProductPricePlanList = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }

  private getHeader(): void {
    this.firebaseService.getAll(FirebasePath.keyProductPricePlanHeader).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as Header})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.headerColumn = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }

  private saveHeader(): void {
    this.headerColumn.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.keyProductPricePlanHeader, value).then(() => {
          if (index + 1 === this.headerColumn.length) {
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.keyProductPricePlanHeader, value.id, value)
          .then(() => {
            if (index + 1 === this.headerColumn.length) {
            }
          })
          .catch(err => {
            alert('Error updated: ' + value);
            console.log(err);
          });
      }
    });
  }

  private saveBody(): void {
    this.keyProductPricePlanList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.keyProductPricePlan, value).then(() => {
          if (index + 1 === this.keyProductPricePlanList.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.keyProductPricePlan, value.id, value)
          .then(() => {
            if (index === this.keyProductPricePlanList.length) {
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

  // events

  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
