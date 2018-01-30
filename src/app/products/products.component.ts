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
  displayedColumns = ['Product_Name', 'Product_Code', 'Rent', 'Product_Category','Color','Image','Location','Actions'];
  dataSource= new MatTableDataSource();
  xyz :  any =[];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public Apiservice : ApiService,db: AngularFirestore) {
    this.prodcollection = db.collection('test');
    this.Apiservice.getAllProducts('').subscribe((data) => {
      debugger;
      this.xyz.push(JSON.parse(data._body));
      //this.formatChanger();
      //this.dataSource = this.xyz;
      this.dataSource = new MatTableDataSource(this.xyz[0].Products);
      //this.prodcollection.doc(this.xyz[0].Products[0].Product_Code).set(this.xyz[0].Products[0]);

      this.isLoadingResults = false;
   });
   
  }

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
