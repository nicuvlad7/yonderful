import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditEventPageComponent } from './components/create-edit-event-page/create-edit-event-page.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';

const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent}, 
  { path: 'register', component: RegisterCardComponent},
  { path: 'create-edit-event', component: CreateEditEventPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
