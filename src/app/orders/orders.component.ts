import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource,MatFormField,MatFormFieldControl} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { ApiService } from '../api.service';
import { Data } from '@angular/router/src/config';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
const Shipment_URL = environment.deliveryUrl;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [ApiService]
})
export class OrdersComponent implements AfterViewInit {
  displayedColumns = ['Bill_Number', 'Customer', 'Booking_Status', 'Rent','Booking_Amount','Due_Rent','Start_Date','End_Date','Booking_Date'];
  dataSource= new MatTableDataSource();
  xyz :  any =[];
  isLoadingResults = true;
  shipment: ShipmentData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public Apiservice : ApiService) {

    this.Apiservice.getAllOrders().subscribe((data) => {
      debugger;
      this.xyz.push(JSON.parse(data._body));
      //this.formatChanger();
      //this.dataSource = this.xyz;
      this.dataSource = new MatTableDataSource(this.xyz[0].orders);
      this.isLoadingResults = false;
   });
   
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  formatChanger(){
    debugger;
    var length = this.xyz[0].Shipment.length;
    for(var i=0;i<length;i++){
      this.xyz[0].Shipment[i].Date_of_Delivery = new Date(this.xyz[0].Shipment[i].Date_of_Delivery);
    }


  }

}

export interface ShipmentData {
  Bill_Number: string;
  Date_of_Delivery: string;
  Type_of_delivery :string;
  Delivery_Charges : string;
  Expenses: string;
  Action_Date:string;
  Comments:string;
}


