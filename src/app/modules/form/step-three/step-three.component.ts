import {Component, OnInit} from '@angular/core';
import {FinancialObjectives, FinancialObjectivesBody} from '../../../commons/models/financialObjectives';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})


export class StepThreeComponent implements OnInit {
  scale = 0.8;

  constructor(private firebaseService: FirebaseService) {
    this.financialObjectivesList = [];
    let financialObjectives = new FinancialObjectives();
    financialObjectives.type = this.briefcase.type;
    financialObjectives.label = this.briefcase.label;
    financialObjectives.salesAchieved = [{salesAchieved: '', year: new Date().getFullYear() - 1}];
    financialObjectives.projected = [{projected: '', year: new Date().getFullYear() + 1}];
    this.financialObjectivesList.push(financialObjectives);
    financialObjectives = new FinancialObjectives();
    financialObjectives.type = this.product.type;
    financialObjectives.label = this.product.label;
    financialObjectives.salesAchieved = [{salesAchieved: '', year: new Date().getFullYear() - 1}];
    financialObjectives.projected = [{projected: '', year: new Date().getFullYear() + 1}];
    this.financialObjectivesList.push(financialObjectives);
    financialObjectives = new FinancialObjectives();
    financialObjectives.type = this.cannibalization.type;
    financialObjectives.label = this.cannibalization.label;
    financialObjectives.salesAchieved = [{salesAchieved: '', year: new Date().getFullYear() - 1}];
    financialObjectives.projected = [{projected: '', year: new Date().getFullYear() + 1}];
    this.financialObjectivesList.push(financialObjectives);
  }

  years = [{year: new Date().getFullYear() - 1}];
  yearsProjected = [{year: new Date().getFullYear() + 1}];
  columnYearProjected: any;
  year = new Date().getFullYear();
  financialObjectivesList: Array<FinancialObjectives>;
  financialObjectivesBody: FinancialObjectivesBody = new FinancialObjectivesBody();
  briefcase = {label: 'Portafolio:', key: 'Briefcase', type: 'B'};
  product = {label: 'Producto:', key: 'Product', type: 'P'};
  cannibalization = {label: 'Canibalización esperada (Negativo):', key: 'Cannibalization', type: 'C'};
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {data: [50, -50], label: 'Series A'}
  ];

  ngOnInit(): void {
    this.getForm();
    this.getFormBody();
  }

  addColumnSales(): void {
    const year = ((this.years.sort((a, b) => {
      return a.year - b.year;
    })[0].year) - 1);
    this.years.push({year});
    this.years = this.years.sort((a, b) => {
      return a.year - b.year;
    });
    this.financialObjectivesList.forEach((value, index) => {
      value.salesAchieved.push({salesAchieved: '', year});
    });
    this.financialObjectivesList.forEach((value, index) => {
      value.salesAchieved = value.salesAchieved.sort((a, b) => {
        return a.year - b.year;
      });
    });
    this.financialObjectivesBody.financialObjectivesBodyList.forEach((value, index) => {
      value.salesAchieved.push({salesAchieved: '', year});
    });
    this.financialObjectivesBody.financialObjectivesBodyList.forEach((value, index) => {
      value.salesAchieved = value.salesAchieved.sort((a, b) => {
        return a.year - b.year;
      });
    });

  }

  removeColumnSales(id: number): void {
    this.years = this.years.filter((value, index) => id !== index);
    this.years = this.years.sort((a, b) => {
      return a.year - b.year;
    });
    this.financialObjectivesList = this.financialObjectivesList.filter((value, index) => id !== index);
  }

  addColumnProjected(): void {
    const year = ((this.yearsProjected.sort((a, b) => {
      return a.year - b.year;
    }).reverse()[0].year) + 1);
    this.yearsProjected.push({year});
    this.yearsProjected = this.yearsProjected.sort((a, b) => {
      return a.year - b.year;
    });
    this.financialObjectivesList.forEach((value, index) => {
      value.projected.push({projected: '', year});
    });
    this.financialObjectivesList.forEach((value, index) => {
      value.projected = value.projected.sort((a, b) => {
        return a.year - b.year;
      });
    });
    this.financialObjectivesBody.financialObjectivesBodyList.forEach((value, index) => {
      value.projected.push({projected: '', year});
    });
    this.financialObjectivesBody.financialObjectivesBodyList.forEach((value, index) => {
      value.projected = value.projected.sort((a, b) => {
        return a.year - b.year;
      });
    });

  }

  removeColumnProjected(id: number): void {
    this.yearsProjected = this.yearsProjected.filter((value, index) => id !== index);
    this.yearsProjected = this.yearsProjected.sort((a, b) => {
      return a.year - b.year;
    });
    this.financialObjectivesList.forEach(value => {
      value.projected.pop();
    });
  }

  addRow(type: string, id: number): void {
    switch (type) {
      case this.briefcase.type: {
        let financialObjectives = new FinancialObjectives();
        financialObjectives.type = this.briefcase.type;
        financialObjectives.label = this.briefcase.label;
        financialObjectives.salesAchieved = [];
        this.years.forEach(year => {
          financialObjectives.salesAchieved.push({salesAchieved: '', year: year.year});
        });
        financialObjectives.projected = [];
        this.yearsProjected.forEach(year => {
          financialObjectives.projected.push({projected: '', year: year.year});
        });
        this.financialObjectivesList.push(financialObjectives);
        financialObjectives = new FinancialObjectives();
        financialObjectives.type = this.product.type;
        financialObjectives.label = this.product.label;
        financialObjectives.salesAchieved = [];
        this.years.forEach(year => {
          financialObjectives.salesAchieved.push({salesAchieved: '', year: year.year});
        });
        financialObjectives.projected = [];
        this.yearsProjected.forEach(year => {
          financialObjectives.projected.push({projected: '', year: year.year});
        });
        this.financialObjectivesList.push(financialObjectives);
        financialObjectives = new FinancialObjectives();
        financialObjectives.type = this.cannibalization.type;
        financialObjectives.label = this.cannibalization.label;
        financialObjectives.salesAchieved = [];
        this.years.forEach(year => {
          financialObjectives.salesAchieved.push({salesAchieved: '', year: year.year});
        });
        financialObjectives.projected = [];
        this.yearsProjected.forEach(year => {
          financialObjectives.projected.push({projected: '', year: year.year});
        });
        this.financialObjectivesList.push(financialObjectives);
        break;
      }
      case this.product.type: {
        const list = [];
        this.financialObjectivesList.forEach((value, index) => {
          list.push(value);
          if (id === index) {
            const financialObjectives = new FinancialObjectives();
            financialObjectives.type = this.product.type;
            financialObjectives.label = this.product.label;
            financialObjectives.salesAchieved = [];
            this.years.forEach(year => {
              financialObjectives.salesAchieved.push({salesAchieved: '', year: year.year});
            });
            financialObjectives.projected = [];
            this.yearsProjected.forEach(year => {
              financialObjectives.projected.push({projected: '', year: year.year});
            });
            list.push(financialObjectives);
          }
        });
        this.financialObjectivesList = list;
        break;
      }
    }

  }

  removeRow(type: any, index: number): void {

  }

  save(): void {
    this.saveForm();
    this.saveBody();
  }

  private getForm(): void {
    this.firebaseService.getAll(FirebasePath.financialObjectives).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as FinancialObjectives})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.financialObjectivesList = data.sort((a, b) => {
          return a.index - b.index;
        });
        this.years = [];
        this.financialObjectivesList[0].salesAchieved.forEach(value => {
          this.years.push({year: value.year});
        });
        this.years = this.years.sort((a, b) => {
          return a.year - b.year;
        });
        this.yearsProjected = [];
        this.financialObjectivesList[0].projected.forEach(value => {
          this.yearsProjected.push({year: value.year});
        });
        this.yearsProjected = this.yearsProjected.sort((a, b) => {
          return a.year - b.year;
        });
      }
    });
  }

  private getFormBody(): void {
    this.firebaseService.getAll(FirebasePath.financialObjectivesBody).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as FinancialObjectives})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.financialObjectivesBody.financialObjectivesBodyList = [];
        data.forEach(value => {
          this.financialObjectivesBody.financialObjectivesBodyList.push(value);
          switch (value.index) {
            case 0:
              this.financialObjectivesBody.netSales = value;
              break;
            case 1:
              this.financialObjectivesBody.averageGrowth = value;
              break;
            case 2:
              this.financialObjectivesBody.averageGrossMargin = value;
              break;
            case 3:
              this.financialObjectivesBody.directCost = value;
              break;
            case 4:
              this.financialObjectivesBody.grossMargin = value;
              break;
            case 5:
              this.financialObjectivesBody.marketingBudget = value;
              break;
            case 6:
              this.financialObjectivesBody.salesBudget = value;
              break;
            case 7:
              this.financialObjectivesBody.otherCosts = value;
              break;
            case 8:
              this.financialObjectivesBody.settings = value;
              break;
            case 9:
              this.financialObjectivesBody.salesMarketingExpenses = value;
              break;
            case 10:
              this.financialObjectivesBody.marketingExpenses = value;
              break;
            case 11:
              this.financialObjectivesBody.administrativeOtherCosts = value;
              break;
            case 12:
              this.financialObjectivesBody.earningsBeforeTaxes = value;
              break;
            case 13:
              this.financialObjectivesBody.ebitda = value;
              break;
            case 14:
              this.financialObjectivesBody.operationsReview = value;
              break;
            case 15:
              this.financialObjectivesBody.numberInterestedClientsContacted = value;
              break;
            case 16:
              this.financialObjectivesBody.ebitdaSellingExpenses = value;
              break;
            case 17:
              this.financialObjectivesBody.administrativeExpensesSales = value;
              break;
          }
        });
      }
    });
  }


  private saveForm(): void {
    this.financialObjectivesList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.financialObjectives, value).then(() => {
          if (index + 1 === this.financialObjectivesList.length) {
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.financialObjectives, value.id, value)
          .then(() => {
            if (index === this.financialObjectivesList.length) {
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
    this.financialObjectivesBody.financialObjectivesBodyList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.financialObjectivesBody, value).then(() => {
          if (index + 1 === this.financialObjectivesList.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.financialObjectivesBody, value.id, value)
          .then(() => {
            if (index === this.financialObjectivesList.length) {
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

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
  }
}
