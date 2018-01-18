import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource,MatFormField,MatFormFieldControl} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { ApiService } from '../api.service';
import { Data } from '@angular/router/src/config';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
const Shipment_URL = environment.deliveryUrl;
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [ ApiService ]
})
export class DeliveryComponent implements AfterViewInit {
  displayedColumns = ['Bill_Number', 'Date_of_Delivery', 'Type_of_delivery', 'Delivery_Charges','Expenses','Action_Date','Comments'];
  dataSource= new MatTableDataSource();
  xyz :  any =[];
  isLoadingResults = true;
  shipment: ShipmentData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public Apiservice : ApiService) {

    this.Apiservice.getAllShipments().subscribe((data) => {
      debugger;
      this.xyz.push(JSON.parse(data._body));
      //this.dataSource = this.xyz;
      this.dataSource = new MatTableDataSource(this.xyz[0].Shipment);
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

