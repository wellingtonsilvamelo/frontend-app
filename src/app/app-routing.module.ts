import { FormTemplateDrivenComponent } from './form-template-driven/form-template-driven.component';
import { FormDataDrivenComponent } from './form-data-driven/form-data-driven.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'image-search',
    component: ImageSearchComponent,
    data: { title: 'Image Search' }
  },
  {
    path: 'todo-list',
    component: TodoListComponent,
    data: { title: 'TODO List' }
  },
  {
    path: 'form-template-driven',
    component: FormTemplateDrivenComponent,
    data: { title: 'Form Template Driven' }
  },
  {
    path: 'form-data-driven',
    component: FormDataDrivenComponent,
    data: { title: 'Form Data Driven' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Sign In' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Sign On' }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
