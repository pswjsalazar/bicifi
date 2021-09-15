import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './form.component';

const appRoutes: Routes = [
  {path: 'Form', component: FormComponent},
  // {path: '', component: FormComponent, pathMatch: 'full'},
  // {path: '*', component: FormComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class FormRoutingModule {
}
