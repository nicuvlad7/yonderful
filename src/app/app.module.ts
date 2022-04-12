import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { MaterialModules } from './modules/material.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { CreateEditEventPageComponent } from './components/create-edit-event-page/create-edit-event-page.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InfoComponent } from './components/info/info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { ParticipantsDialogComponent } from './components/participants-dialog/participants-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GenericFilterComponent } from './components/generic-filter/generic-filter.component';
import { ThreeEventsComponent } from './components/three-events/three-events.component';
import { GenericEventPageComponent } from './components/generic-event-page/generic-event-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginCardComponent,
		RegisterCardComponent,
		SidenavComponent,
		ToolbarComponent,
		ConfirmComponent,
		RegisterCardComponent,
		LoginCardComponent,
		CreateEditEventPageComponent,
		CategoriesTableComponent,
		CategoryCardComponent,
		UploadFileComponent,
		EventCardComponent,
		EventPageComponent,
		InfoComponent,
		DashboardComponent,
		GenericFilterComponent,
		AllEventsComponent,
		ParticipantsDialogComponent,
		UserDetailsComponent,
        NotFoundComponent,
        ThreeEventsComponent,
        GenericEventPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModules,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        MatDatepickerModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
