import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
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
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailsComponent,
    EventListPageComponent,
    SidenavComponent,
    ToolbarComponent,
    ConfirmComponent,
    RegisterCardComponent,
    LoginCardComponent,
    CreateEditEventPageComponent,
    CategoriesTableComponent,
    CategoryCardComponent,
    NewCategoryComponent,
    UploadFileComponent,
    EventCardComponent,
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
