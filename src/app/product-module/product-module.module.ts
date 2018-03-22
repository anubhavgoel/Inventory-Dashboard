import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from "@angular/material";
import { TagInputModule } from "ngx-chips";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";
import { ProductAddComponent } from "./product-add/product-add.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { productsRouting } from "./product-routing.module";
import { StoreDetailComponent } from "./store-detail/store-detail.component";
import { UploadService } from "./upload-service";

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
    productsRouting,
    MatChipsModule,
    TagInputModule
  ],
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent,
    StoreDetailComponent,
    CategoryDetailComponent
  ],
  exports: [ProductListComponent, ProductAddComponent, ProductDetailComponent],
  providers: [UploadService]
})
export class ProductModuleModule {}
