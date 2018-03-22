import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderAddComponent } from "./order-add/order-add.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListComponent } from "./order-list/order-list.component";

import { OrderTaskboardComponent } from "./order-taskboard/order-taskboard.component";
const orderRoutes: Routes = [
  {
    path: "",
    component: OrderListComponent
  },

  { path: "add", component: OrderAddComponent },
  { path: "taskboard", component: OrderTaskboardComponent },
  { path: ":id", component: OrderDetailComponent }
];
export const ordersRouting = RouterModule.forChild(orderRoutes);
