import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatFormFieldModule,MatTableModule, MatPaginatorModule ,MatSortModule, MatFormFieldControl,MatInputModule,MatProgressSpinnerModule, MatStepperModule, MatButtonModule, MatAutocompleteModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatTabsModule, MatListModule, MatSelectModule, MatIconModule } from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import { productsRouting } from './product-routing.module';
import {UploadService} from './upload-service';
import { StoreDetailComponent } from './store-detail/store-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
    MatIconModule,
    MatDatepickerModule,
    productsRouting
  ],
  declarations: [ProductListComponent, ProductAddComponent, ProductDetailComponent, StoreDetailComponent],
  exports: [
    ProductListComponent, ProductAddComponent, ProductDetailComponent
  ],
  providers: [
    UploadService,
  ],
})
export class ProductModuleModule { }
