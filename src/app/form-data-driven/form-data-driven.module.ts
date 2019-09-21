import { DropdownService } from './../services/dropdown.service';
import { InvalidFeedbackComponent } from './../invalid-feedback/invalid-feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { FormDataDrivenComponent } from './form-data-driven.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

@NgModule({
  declarations: [
    FormDataDrivenComponent,
    InvalidFeedbackComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ErrorMessageComponent,
    InvalidFeedbackComponent
  ]
})
export class FormDataDrivenModule { }
