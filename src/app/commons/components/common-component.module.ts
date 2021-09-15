import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './comments/comments.component';
import {HeaderFormComponent} from './header-form/header-form.component';


@NgModule({
  declarations: [CommentsComponent, HeaderFormComponent],
  exports: [
    CommentsComponent,
    HeaderFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule {
}
