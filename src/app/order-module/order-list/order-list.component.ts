import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatFormField, MatFormFieldControl } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['orderNumber', 'product', 'startDate', 'endDate', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  test: any;
  constructor(private db: AngularFirestore) {
    this.prodcollection = db.collection('bookings');
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe((data) => {
      this.xyz = data;
      this.dataSource = new MatTableDataSource(this.xyz);
    });
   }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
