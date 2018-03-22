import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { TextMaskModule } from "angular2-text-mask";
import { DragulaModule } from "ng2-dragula";
import { LoadingModule } from "ngx-loading";
import { OrderAddComponent } from "./order-add/order-add.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { ordersRouting } from "./order-routing.module";
import { OrderTaskboardComponent } from "./order-taskboard/order-taskboard.component";
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
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    TextMaskModule,
    MatProgressSpinnerModule,
    LoadingModule,
    DragulaModule
  ],
  declarations: [
    OrderAddComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderTaskboardComponent
  ]
})
export class OrderModuleModule {}
