import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource,MatFormField,MatFormFieldControl} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { ApiService } from '../api.service';
import { Data } from '@angular/router/src/config';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
const Shipment_URL = environment.deliveryUrl;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ApiService]
})
export class ProductsComponent implements AfterViewInit {

  
  constructor(public Apiservice : ApiService,db: AngularFirestore) {
  
   
  }

  ngAfterViewInit() {
  }



}
