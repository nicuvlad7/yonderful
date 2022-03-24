import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditEventPageComponent } from './components/create-edit-event-page/create-edit-event-page.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent}, 
  { path: 'register', component: RegisterCardComponent },
  { path: 'administrate-categories', component: CategoriesTableComponent},
  { path: 'register', component: RegisterCardComponent},
  { path: 'create-edit-event', component: CreateEditEventPageComponent },
  { path : 'category/new', component: NewCategoryComponent},
  { path : 'category/:id',component: CategoryCardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'user-details', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
