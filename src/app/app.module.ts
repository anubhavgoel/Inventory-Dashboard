import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { CardComponent } from "beryl";
import { PapaParseModule } from "ngx-papaparse";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrderModuleModule } from "./order-module/order-module.module";
import { ProductModuleModule } from "./product-module/product-module.module";
@NgModule({
  declarations: [AppComponent, DashboardComponent, CardComponent],
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
export class AppModule {}
