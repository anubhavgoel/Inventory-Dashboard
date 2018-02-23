import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatExpansionModule, MatFormFieldModule, MatStepperModule, MatButtonModule, MatInputModule, MatAutocompleteModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatSelectModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import{ordersRouting} from './order-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import{MatMomentDateModule} from '@angular/material-moment-adapter';
import { TextMaskModule } from 'angular2-text-mask';
import { LoadingModule } from 'ngx-loading';
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
    MatMomentDateModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    TextMaskModule,
    MatProgressSpinnerModule,
    LoadingModule
    
  ],
  declarations: [OrderAddComponent, OrderListComponent, OrderDetailComponent]
})
export class OrderModuleModule { }
