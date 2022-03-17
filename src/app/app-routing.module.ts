import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';


const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent},
  { path: 'administrate-categories', component: CategoriesTableComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
