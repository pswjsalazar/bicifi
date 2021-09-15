import {Component, OnInit} from '@angular/core';
import {SegmentAnalysis} from '../../../commons/models/segmentAnalysis';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {
  scale = 0.8;
  constructor(private firebaseService: FirebaseService) {
    this.segmentAnalysisList = [];
    this.segmentAnalysisList.push(new SegmentAnalysis());
  }

  segmentAnalysisList: Array<SegmentAnalysis>;
  totalOpportunity = 0;
  totalLastSalesYear = 0;

  bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ]
    }
  };
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend = true;

  bubbleChartData: ChartDataSets[] = [
    {
      data: [
        {x: 0, y: 10, r: 10},
      ],
      label: 'Series A',
      backgroundColor: 'green',
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
  ];

  public bubbleChartColors: Color[] = [
    {
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ]
    }
  ];

  ngOnInit(): void {
    this.firebaseService.getAll(FirebasePath.segmentAnalysis).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as SegmentAnalysis})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        this.segmentAnalysisList = data.sort((a, b) => {
          return a.index - b.index;
        });
      }
    });
  }

  addRow(): void {
    this.segmentAnalysisList.push(new SegmentAnalysis());
  }

  removeRow(id: number): void {
    this.segmentAnalysisList = this.segmentAnalysisList.filter((value, index) => id !== index);
  }

  save(): void {
    this.segmentAnalysisList.forEach((value, index) => {
      if (value.id === undefined) {
        value.index = index;
        this.firebaseService.create(FirebasePath.segmentAnalysis, value).then(() => {
          if (index + 1 === this.segmentAnalysisList.length) {
            alert('Created new item successfully!');
          }
        }).catch(err => {
          alert('Error Created: ' + value);
          console.log(err);
        });
      } else {
        this.firebaseService.update(FirebasePath.segmentAnalysis, value.id, value)
          .then(() => {
            if (index === this.segmentAnalysisList.length) {
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

  totalOpportunityPotential(): number {
    let total = 0;
    this.segmentAnalysisList.forEach(value => {
      total = total + Number(value.totalOpportunityPotential);
    });
    if (isNaN(total)) {
      return this.totalOpportunity;
    } else {
      this.totalOpportunity = total;
      return total;
    }
  }

  totalLastSalesYearBySegment(): number {
    let total = 0;
    this.segmentAnalysisList.forEach(value => {
      total = total + Number(value.lastSalesYearBySegment);
    });
    if (isNaN(total)) {
      return this.totalLastSalesYear;
    } else {
      this.totalLastSalesYear = total;
      return total;
    }
  }

  totalEstimatedMarketShare(): number {
    const total = Math.round((Number(this.totalLastSalesYear) / Number(this.totalOpportunity) * 100));
    if (isNaN(total)) {
      return 0;
    } else {
      return total;
    }
  }

  // events

  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    const numberOfPoints = this.rand(5) + 5;
    this.bubbleChartData[0].data = Array.apply(null, {length: numberOfPoints}).map(r => this.randomPoint(30));
  }

  private rand(max: number): number {
    return Math.trunc(Math.random() * max);
  }

  private randomPoint(maxCoordinate: number): { r: number; x: number; y: number } {
    const x = this.rand(maxCoordinate);
    const y = this.rand(maxCoordinate);
    const r = this.rand(30) + 5;
    return {x, y, r};
  }
}
