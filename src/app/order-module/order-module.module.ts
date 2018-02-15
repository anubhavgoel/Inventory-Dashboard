import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatExpansionModule, MatFormFieldModule, MatStepperModule, MatButtonModule, MatInputModule, MatAutocompleteModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule } from '@angular/material';
import{ordersRouting} from './order-routing.module'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ordersRouting,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule
    
  ],
  declarations: [OrderAddComponent, OrderListComponent, OrderDetailComponent]
})
export class OrderModuleModule { }
