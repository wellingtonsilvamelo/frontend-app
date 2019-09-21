import { FormDataDrivenModule } from './form-data-driven/form-data-driven.module';
import { TaskFormModule } from './task-form/task-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { FormTemplateDrivenComponent } from './form-template-driven/form-template-driven.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    ImageSearchComponent,
    TodoListComponent,
    CustomModalComponent,
    FormTemplateDrivenComponent,
    LoginComponent,
    RegisterComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true
    }),
    FormsModule,
    TaskFormModule,
    FormDataDrivenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
