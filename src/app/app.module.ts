import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { EventListPageComponent } from './components/event-list-page/event-list-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailsComponent,
    LoginCardComponent,
    EventListPageComponent,
    CategoriesTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
