import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DashboardComponent} from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    loadChildren: 'app/product-module/product-module.module#ProductModuleModule',
  },
  {
    path: 'orders',
    loadChildren: 'app/order-module/order-module.module#OrderModuleModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
