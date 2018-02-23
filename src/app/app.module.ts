import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PapaParseModule } from 'ngx-papaparse';
import { ProductModuleModule } from './product-module/product-module.module';
import { OrderModuleModule } from './order-module/order-module.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import{MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    CommonModule,
    PapaParseModule,
    ProductModuleModule,
    OrderModuleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
