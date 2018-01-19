import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LajpatComponent } from './lajpat/lajpat.component';
import { ApiService } from './api.service';

import { HttpModule } from '@angular/http';
import { DeliveryComponent } from './delivery/delivery.component';
import { PatelComponent } from './patel/patel.component';
import { LaxmiComponent } from './laxmi/laxmi.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule ,MatSortModule, MatFormFieldControl,MatInputModule,MatProgressSpinnerModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LajpatComponent,
    DeliveryComponent,
    PatelComponent,
    LaxmiComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    DxDataGridModule,
    DxDataGridModule,
    MatProgressSpinnerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
