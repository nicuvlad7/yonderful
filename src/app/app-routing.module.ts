import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditEventPageComponent } from './components/create-edit-event-page/create-edit-event-page.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { AdminGuard, AuthGuard, UserGuard } from './helpers/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent, canActivate: [AuthGuard, UserGuard]}, 
  { path: 'administrate-categories', component: CategoriesTableComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'register', component: RegisterCardComponent},
  { path: 'create-edit-event', component: CreateEditEventPageComponent, canActivate: [AuthGuard, UserGuard] },
  { path : 'category', component: CategoryCardComponent, canActivate: [AuthGuard, AdminGuard]},
  { path : 'category/:id',component: CategoryCardComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
