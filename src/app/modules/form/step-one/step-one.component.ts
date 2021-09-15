import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {BasicInformation} from '../../../commons/models/basic-information';
import {Country} from '@angular-material-extensions/select-country';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {DatePipe} from '@angular/common';
import {Utils} from '../../../commons/globals/utils';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  @ViewChild('contentExportPdf') contentExportPdf: ElementRef;

  basicInformation: BasicInformation;
  industries: any = [];
  segments: any = [];
  datePipe = new DatePipe('en-US');
  scale = 0.8;

  constructor(private firebaseService: FirebaseService) {
    this.industries.push({name: 'Seleccione'});
    this.segments.push({name: 'Seleccione'});
    this.basicInformation = new BasicInformation();
    this.basicInformation.mainCompetitors = [{competitor: ''}];
    this.basicInformation.estimatedSales = [{estimatedSale: '', year: new Date().getFullYear()}];
    this.basicInformation.marketingBudget = [{marketingBudget: '', year: new Date().getFullYear()}];
  }

  ngOnInit(): void {
    this.getForm();
    this.getIndustries();
    this.getSegments();
  }

  save(): void {
    this.basicInformation.mainCompetitors = this.basicInformation.mainCompetitors.filter(value => value.competitor !== '');
    this.basicInformation.estimatedSales = this.basicInformation.estimatedSales.filter(value => value.estimatedSales !== '');
    this.basicInformation.marketingBudget = this.basicInformation.marketingBudget.filter(value => value.marketingBudget !== '');
    if (this.basicInformation.id === undefined) {
      this.firebaseService.create(FirebasePath.basicInformation, this.basicInformation).then(() => {
        alert('Created new item successfully!');
      }).catch(err => {
        alert('Error Created');
        console.log(err);
      });
    } else {
      this.firebaseService.update(FirebasePath.basicInformation, this.basicInformation.id, this.basicInformation)
        .then(() => {
          alert('The status was updated successfully!');
        })
        .catch(err => {
          alert('Error updated');
          console.log(err);
        });
    }
  }

  addCompetitor(): void {
    this.basicInformation.mainCompetitors.push({competitor: ''});
  }

  onCountrySelected(country: Country): void {
    console.log(country);
    this.basicInformation.country = country;
  }

  private getIndustries(): void {
    this.firebaseService.getAll(FirebasePath.industries).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as any})
        )
      )
    ).subscribe(data => {
      data.forEach(value => {
        this.industries.push(value);
      });
    });
  }

  private getSegments(): void {
    this.firebaseService.getAll(FirebasePath.segments).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as any})
        )
      )
    ).subscribe(data => {
      data.forEach(value => {
        this.segments.push(value);
      });
    });
  }

  removeCompetitor(): void {
    this.basicInformation.mainCompetitors.pop();
  }

  addEstimatedSale(): void {
    this.basicInformation.estimatedSales.push({estimatedSale: '', year: this.getYear(this.basicInformation.estimatedSales)});
  }

  removeEstimatedSale(): void {
    this.basicInformation.estimatedSales.pop();
  }

  addMarketingBudget(): void {
    this.basicInformation.marketingBudget.push({marketingBudget: '', year: this.getYear(this.basicInformation.marketingBudget)});
  }

  removeMarketingBudget(): void {
    this.basicInformation.marketingBudget.pop();
  }

  getYear(list: any): string {
    return list.map(value => value.year + 1).reverse()[0];
  }

  private getForm(): void {
    this.firebaseService.getAll(FirebasePath.basicInformation).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as BasicInformation})
        )
      )
    ).subscribe(data => {
      if ((data as []).length === 0) {
        this.basicInformation = new BasicInformation();
      } else {
        this.basicInformation = data[data.length - 1];
      }
      if (this.basicInformation.mainCompetitors === undefined) {
        this.basicInformation.mainCompetitors = [{competitor: ''}];
      }
      if (this.basicInformation.estimatedSales === undefined) {
        this.basicInformation.estimatedSales = [{estimatedSale: '', year: new Date().getFullYear()}];
      }
      if (this.basicInformation.marketingBudget === undefined) {
        this.basicInformation.marketingBudget = [{marketingBudget: '', year: new Date().getFullYear()}];
      }
    });
  }

  exportReport(): void {
    const nameFile = 'BasicInformation' + this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    Utils.exportReportPDF(this.contentExportPdf, nameFile);
  }
}
