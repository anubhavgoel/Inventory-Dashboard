import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatFormField,
  MatFormFieldControl,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { Angular2Csv } from "angular2-csv/Angular2-csv";
import { Angular5Csv } from "angular5-csv/Angular5-csv";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { DeleteRecordService } from "../../delete-record.service";
@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
  providers: [DeleteRecordService]
})
export class OrderListComponent implements OnInit {
  displayedColumns = [
    "orderNumber",
    "status",
    "product",
    "phone",
    "grandTotal",
    "orderDate",
    "startDate",
    "endDate",
    "actions",
    "more"
  ];
  dataSource = new MatTableDataSource();
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  test: any;
  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    private deleteRecordService: DeleteRecordService
  ) {
    this.prodcollection = db.collection("orders");
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe(data => {
      this.xyz = data;
      this.dataSource = new MatTableDataSource(this.xyz);
    });
  }

  ngOnInit() {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  applyDateFilter(value) {
    debugger;
    this.dataSource.filter = value.toString();
  }
  customerDetails() {}
  exportData() {
    const options = {
      // tslint:disable-next-line:quotemark
      fieldSeparator: ",",
      // tslint:disable-next-line:quotemark
      quoteStrings: '"',
      // tslint:disable-next-line:quotemark
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true
    };
    new Angular5Csv(this.xyz, "My Report", options);
  }
  deleteOrder(orderNumber) {
    const order = this.deleteRecordService.deleteRecord("orders", orderNumber);
    const bookings = this.deleteRecordService.deleteRecord(
      "bookings",
      orderNumber
    );
    const productAvailability = this.deleteRecordService.deleteRecord(
      "productAvailability",
      orderNumber
    );
    const delivery = this.deleteRecordService.deleteRecord(
      "delivery",
      orderNumber
    );
    const returns = this.deleteRecordService.deleteRecord(
      "return",
      orderNumber
    );
  }
}
