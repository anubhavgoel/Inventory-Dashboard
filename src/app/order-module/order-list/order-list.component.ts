import { Component, OnInit,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatFormField, MatFormFieldControl ,MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['orderNumber', 'status', 'product', 'phone', 'grandTotal','orderDate','startDate','endDate','actions'];
  dataSource = new MatTableDataSource();
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  test: any;
  constructor(private db: AngularFirestore,public dialog: MatDialog) {
    this.prodcollection = db.collection('orders');
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
  customerDetails(){
    
  }
}
