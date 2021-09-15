import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {ErrorComponent} from './error/error.component';
import {NotFoundComponent} from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'AccessDenied', component: AccessDeniedComponent},
  {path: 'Error', component: ErrorComponent},
  {path: 'NotFound', component: NotFoundComponent},
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
export class AppRoutingModule {
}
