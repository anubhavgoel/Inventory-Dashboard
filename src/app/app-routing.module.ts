import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add this
import { LajpatComponent } from './lajpat/lajpat.component'; 
import { LaxmiComponent } from './laxmi/laxmi.component';
import { PatelComponent } from './patel/patel.component';
import {DeliveryComponent} from './delivery/delivery.component';
import{OrdersComponent} from './orders/orders.component';
import{ProductsComponent} from './products/products.component';
import{ProductDetailComponent} from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/lajpat',
    component: LajpatComponent
  },
  {
    path: 'laxmi',
    component: LaxmiComponent
  },
  {
    path: 'patel',
    component: PatelComponent
  },
  {
    path: 'delivery',
    component: DeliveryComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'products/add',
    component: ProductAddComponent
  },
  {
    path: 'products/:Product_Code',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
