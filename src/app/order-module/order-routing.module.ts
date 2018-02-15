import { NgModule } from '@angular/core';   
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const orderRoutes: Routes = [
    { path: 'orders',
      children: [
        { path: '', component: OrderListComponent },
        { path: 'add', component: OrderAddComponent },
        { path: ':id', component: OrderDetailComponent }
        
      ]
    }
  ];
  export const ordersRouting = RouterModule.forChild(orderRoutes);