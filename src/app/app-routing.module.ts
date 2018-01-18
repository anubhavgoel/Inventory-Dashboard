import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add this
import { LajpatComponent } from './lajpat/lajpat.component'; 
import { LaxmiComponent } from './laxmi/laxmi.component';
import { PatelComponent } from './patel/patel.component';
import {DeliveryComponent} from './delivery/delivery.component';
const routes: Routes = [
  {
    path: 'home',
    component: DeliveryComponent
  },
  {
    path: 'lajpat',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
