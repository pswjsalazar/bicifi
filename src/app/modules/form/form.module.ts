import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepFourComponent} from './step-four/step-four.component';
import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';
import {StepThreeComponent} from './step-three/step-three.component';
import {StepFiveComponent} from './step-five/step-five.component';
import {StepSixComponent} from './step-six/step-six.component';
import {StepSevenComponent} from './step-seven/step-seven.component';
import {StepEightComponent} from './step-eight/step-eight.component';
import {FormComponent} from './form.component';
import {FormRoutingModule} from './form-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {CommonComponentModule} from '../../commons/components/common-component.module';
import {StepNineComponent} from './step-nine/step-nine.component';
import {FormsModule} from '@angular/forms';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {MatButtonModule} from '@angular/material/button';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {SegmentComponent} from './step-four/segment/segment.component';
import {CanalSegmentComponent} from './step-six/canal-segment/canal-segment.component';
import {StepSegmentComponent} from './step-six/canal-segment/step-segment/step-segment.component';
import {PlanComponent} from './step-nine/plan/plan.component';


@NgModule({
  declarations: [
    StepFourComponent, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFiveComponent, StepSixComponent,
    StepSevenComponent, StepEightComponent, FormComponent, StepNineComponent, SegmentComponent, CanalSegmentComponent, StepSegmentComponent, PlanComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    NgbModule,
    MatTabsModule,
    MatIconModule,
    CommonComponentModule,
    FormsModule,
    MatSelectCountryModule.forRoot('es'),
    HttpClientModule,
    ChartsModule,
    MatButtonModule,
    PDFExportModule
  ]
})
export class FormModule {
}
