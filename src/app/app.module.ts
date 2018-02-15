import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LajpatComponent } from './lajpat/lajpat.component';
import { ApiService } from './api.service';
import {ReactiveFormsModule} from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { DeliveryComponent } from './delivery/delivery.component';
import { PatelComponent } from './patel/patel.component';
import { LaxmiComponent } from './laxmi/laxmi.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule ,MatSortModule, MatFormFieldControl,MatInputModule,MatProgressSpinnerModule, MatStepperModule, MatButtonModule, MatAutocompleteModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatTabsModule, MatListModule, MatSelectModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrdersComponent } from './orders/orders.component';
import { CommonModule } from '@angular/common'; 
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { PapaParseModule } from 'ngx-papaparse';
import { ProductModuleModule } from './product-module/product-module.module';
import { OrderModuleModule } from './order-module/order-module.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LajpatComponent,
    DeliveryComponent,
    PatelComponent,
    LaxmiComponent,
    OrdersComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent
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
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    PapaParseModule,
    ProductModuleModule,
    OrderModuleModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
