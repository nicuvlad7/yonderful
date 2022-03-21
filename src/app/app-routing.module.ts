import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';

const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent}, 
  { path: 'register', component: RegisterCardComponent},
  { path : 'category/new', component: NewCategoryComponent},
  { path : 'category/:id',component: CategoryCardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
