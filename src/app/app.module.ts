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

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import { MaterialModules } from './modules/material.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModules,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
