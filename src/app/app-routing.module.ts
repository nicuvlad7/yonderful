import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent},
  { path: 'user-page', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
