import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginCardComponent },
  { path: 'events-list', component: EventListPageComponent, canActivate: [AuthGuard]}, 
  { path: 'register', component: RegisterCardComponent},

  { path: '**', redirectTo: 'events-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
