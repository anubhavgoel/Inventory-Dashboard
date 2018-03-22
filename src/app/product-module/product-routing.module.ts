import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryDetailComponent } from "../product-module/category-detail/category-detail.component";
import { ProductAddComponent } from "../product-module/product-add/product-add.component";
import { ProductDetailComponent } from "../product-module/product-detail/product-detail.component";
import { ProductListComponent } from "../product-module/product-list/product-list.component";
import { StoreDetailComponent } from "../product-module/store-detail/store-detail.component";

const productRoutes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },

  { path: "add", component: ProductAddComponent },
  { path: "store/:location", component: StoreDetailComponent },
  { path: "store/:location/:category", component: CategoryDetailComponent },
  { path: "category/:location/:id", component: ProductDetailComponent },
  { path: ":id", component: ProductDetailComponent }
];

export const productsRouting = RouterModule.forChild(productRoutes);
