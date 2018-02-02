import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatFormFieldModule,MatTableModule, MatPaginatorModule ,MatSortModule, MatFormFieldControl,MatInputModule,MatProgressSpinnerModule, MatStepperModule, MatButtonModule, MatAutocompleteModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatTabsModule, MatListModule, MatSelectModule, MatIconModule } from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PapaParseModule } from 'ngx-papaparse';

import { environment } from '../../environments/environment';
import { productsRouting } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
    MatIconModule,
    MatDatepickerModule,
    productsRouting
  ],
  declarations: [ProductListComponent, ProductAddComponent, ProductDetailComponent],
  exports: [
    ProductListComponent, ProductAddComponent, ProductDetailComponent
  ]
})
export class ProductModuleModule { }
