import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatFormField, MatFormFieldControl } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../api.service';
import { Data } from '@angular/router/src/config';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
const Shipment_URL = environment.deliveryUrl;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ApiService]
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns = ['product_code', 'product_name', 'manfacturing_code', 'rent', 'image', 'procurement_cost', 'dop', 'color', 'vendor', 'location', 'category', 'status', 'size', 'actions'];
  dataSource = new MatTableDataSource();
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  test: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public Apiservice: ApiService, db: AngularFirestore, private router: Router) {
    this.prodcollection = db.collection('products');
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe((data) => {
      this.xyz = data;
      this.dataSource = new MatTableDataSource(this.xyz);
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
  edit(data) {
    debugger;
    console.log(data);
    this.router.navigate(['/products/add']);
  }

}

