import {Component, OnInit} from '@angular/core';
import {CanalSegment} from '../../../commons/models/canalSegment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CanalSegmentComponent} from './canal-segment/canal-segment.component';
import {FirebasePath} from '../../../commons/globals/firebasePath';
import {FirebaseService} from '../../../commons/services/firebase.service';
import {map} from 'rxjs/operators';
import {IntermediaryChannel} from '../../../commons/models/intermediaryChannel';
import {CanalDetail} from '../../../commons/models/canalDetail';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.css']
})
export class StepSixComponent implements OnInit {
  items: CanalSegment[] = [];

  constructor(private firebaseService: FirebaseService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getItems();

  }

  addSegment(): void {
    const modalRef = this.modalService.open(CanalSegmentComponent, {
      size: 'xl'
    });
    modalRef.result.catch(reason => {
      if (reason !== 0 && reason !== 1) {
        this.items.push(reason.canalSegment);
      }
    });
  }

  save(): void {
    console.log(this.items);
    this.items.forEach((canalSegment, canalIndex) => {
      const canalSegmentTemp = new CanalSegment();
      canalSegmentTemp.name = canalSegment.name ?? '';
      canalSegmentTemp.demandGenerationTechniques = canalSegment.demandGenerationTechniques ?? '';
      canalSegmentTemp.estimatedGrossMargin = canalSegment.estimatedGrossMargin ?? '';
      canalSegmentTemp.segmentsVerticals = canalSegment.segmentsVerticals ?? '';
      if (canalSegment.id === undefined) {
        canalSegment.index = canalIndex + 1;
        canalSegmentTemp.index = canalSegment.index;
        console.log(canalSegmentTemp);
        this.firebaseService.create(FirebasePath.canalSegment, canalSegmentTemp).then(canalSegmentSaved => {
          console.log(canalSegment);
          canalSegment.intermediaryChannel.forEach((intermediaryChannel, intermediaryChannelIndex) => {
            const intermediateChannelTemp = new IntermediaryChannel();
            intermediateChannelTemp.idCanalSegment = canalSegmentSaved.id;
            intermediateChannelTemp.smallView = intermediaryChannel.smallView;
            intermediateChannelTemp.name = intermediaryChannel.name ?? '';
            intermediateChannelTemp.assignsAccountsTerritories = intermediaryChannel.assignsAccountsTerritories ?? '';
            intermediateChannelTemp.averageSaleCanal = intermediaryChannel.averageSaleCanal ?? '';
            intermediateChannelTemp.estimatedGrossMargin = intermediaryChannel.estimatedGrossMargin ?? '';
            intermediateChannelTemp.serveOtherSegments = intermediaryChannel.serveOtherSegments ?? '';
            intermediateChannelTemp.signContracts = intermediaryChannel.signContracts ?? '';
            if (intermediaryChannel.id === undefined) {
              intermediaryChannel.index = intermediaryChannelIndex + 1;
              intermediateChannelTemp.index = intermediaryChannel.index;
              console.log(intermediaryChannel);
              this.firebaseService.create(FirebasePath.canalStepSegment, intermediateChannelTemp).then(intermediaryChannelSaved => {
                console.log(intermediaryChannel);
                intermediaryChannel.canalDetail.forEach((canalDetail, canalDetailIndex) => {
                  const canalDetailTemp = new CanalDetail();
                  canalDetailTemp.idIntermediaryChannel = intermediaryChannelSaved.id;
                  canalDetailTemp.name = canalDetail.name ?? '';
                  canalDetailTemp.assignedTerritory = canalDetail.assignedTerritory ?? '';
                  canalDetailTemp.contract = canalDetail.contract ?? '';
                  canalDetailTemp.exclusive = canalDetail.exclusive ?? '';
                  canalDetailTemp.shareData = canalDetail.shareData ?? '';
                  canalDetailTemp.index = canalDetailIndex + 1;
                  this.firebaseService.create(FirebasePath.canalDetail, canalDetailTemp).then(() => {

                  });

                });
              }).catch(err => {
                alert('Error Created: ' + intermediaryChannel);
                console.log(err);
              });
            } else {
              // this.firebaseService.update(FirebasePath.canalStepSegment, intermediaryChannel.id, intermediaryChannel)
              //   .then(() => {
              //     if (intermediaryChannelIndex + 1 === this.items.length) {
              //       alert('The status was updated successfully!');
              //     }
              //   })
              //   .catch(err => {
              //     alert('Error updated: ' + intermediaryChannel);
              //     console.log(err);
              //   });
            }
          });
        }).catch(err => {
          alert('Error Created: ' + canalSegment);
          console.log(err);
        });
      } else {
        // canalSegmentTemp.id = canalSegment.id;
        // this.firebaseService.update(FirebasePath.canalSegment, canalSegmentTemp.id, canalSegmentTemp)
        //   .then(() => {
        //     if (canalIndex + 1 === this.items.length) {
        //       alert('The status was updated successfully!');
        //     }
        //   })
        //   .catch(err => {
        //     alert('Error updated: ' + canalSegment);
        //     console.log(err);
        //   });
      }
    });
  }

  private getCanalSegments(): void {
    this.firebaseService.getAll(FirebasePath.canalSegment).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as CanalSegment})
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

  private getIntermediaryChannel() {
    this.firebaseService.getAll(FirebasePath.canalStepSegment).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as IntermediaryChannel})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        const items = data.sort((a, b) => {
          return a.index - b.index;
        });
        this.items.forEach(value => {
          value.intermediaryChannel = items.filter(value1 => value.id === value1.idCanalSegment);
        });
      }
    });
  }

  private getCanalDetail() {
    this.firebaseService.getAll(FirebasePath.canalDetail).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data() as CanalDetail})
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        const items = data.sort((a, b) => {
          return a.index - b.index;
        });
        this.items.forEach(value => {
          value.intermediaryChannel.forEach(value1 => {
            value1.canalDetail = items.filter(value2 => value1.id === value2.idIntermediaryChannel);
          });
        });
      }
    });
  }

  private async getItems() {
    console.log(this.items);
    console.log(1);
    await this.getCanalSegments();
    console.log(this.items);
    console.log(2);
    await this.getIntermediaryChannel();
    console.log(this.items);
    console.log(3);
    await this.getCanalDetail();
    console.log(this.items);
    console.log(4);
  }
}
