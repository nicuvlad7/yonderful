import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditEventPageComponent } from './components/create-edit-event-page/create-edit-event-page.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { AdminGuard, AuthGuard, UserGuard } from './helpers/auth.guard';
import { RouteValues } from './models/constants';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
    { path: RouteValues.LOGIN, component: LoginCardComponent },
    { path: RouteValues.REGISTER, component: RegisterCardComponent },
    { path: RouteValues.ADMINISTRATE_CATEGORIES, component: CategoriesTableComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: RouteValues.CREATE_EDIT_EVENT, component: CreateEditEventPageComponent, canActivate: [AuthGuard, UserGuard] },
    { path: RouteValues.CATEGORY_NEW, component: CategoryCardComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: RouteValues.CATEGORY_ID, component: CategoryCardComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: RouteValues.EVENT_DETAILS_ID, component: EventPageComponent, canActivate: [AuthGuard, UserGuard] },
    { path: RouteValues.USER_DETAILS, component: UserDetailsComponent, canActivate: [AuthGuard, UserGuard] },
    { path: RouteValues.DEFAULT, redirectTo: RouteValues.LOGIN, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
