import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import {
  MatFormField,
  MatFormFieldControl,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Data } from "@angular/router/src/config";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase";
import { PapaParseModule, PapaParseService } from "ngx-papaparse";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { ApiService } from "../../api.service";
const Shipment_URL = environment.deliveryUrl;
declare var jquery: any;
declare var $: any;
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  providers: [ApiService]
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns = [
    "product_code",
    "product_name",
    "rent",
    "image",
    "color",
    "location",
    "category",
    "status",
    "size",
    "actions"
  ];
  dataSource = new MatTableDataSource();
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  test: any;
  finalData: any;
  batch: any;
  prodRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public Apiservice: ApiService,
    db: AngularFirestore,
    private router: Router,
    private papa: PapaParseService
  ) {
    this.prodcollection = db.collection("products");
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe(data => {
      this.xyz = data;
      this.dataSource = new MatTableDataSource(this.xyz);
    });

    this.batch = db.firestore.batch();
    this.prodRef = db.firestore.collection("products");
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
    console.log(data);
    this.router.navigate(["/products/add"]);
  }
  add() {
    let refDoc;
    for (let i = 0; i < this.finalData.length; i++) {
      refDoc = this.prodRef.doc(this.finalData[i].product_code);
      this.batch.set(refDoc, this.finalData[i]);
    }
    this.batch.commit();
  }
  photo() {
    debugger;

    this.finalData.forEach((listItem, index) => {
      if (listItem !== "") {
        if (listItem.image === "") {
          listItem.imageUrl =
            "https://firebasestorage.googleapis.com/v0/b/wrapd-inventory.appspot.com/o/no-image.png?alt=media&token=0e72d83a-54e0-4ff5-ac84-0ebed68f9eaf";
        } else {
          const uploadImage = "uploads/" + listItem.image;
          const storageRef = firebase
            .storage()
            .ref()
            .child(uploadImage);
          storageRef.getDownloadURL().then(url => {
            listItem.imageUrl = url;
          });
        }
      }
    });
    // const storageRef = firebase.storage().ref().child('uploads/ln-she-001 size-40.jpg');
    // storageRef.getDownloadURL().then(url => {
    //   console.log(url);

    // });
    console.log(this.finalData);
  }

  upload() {
    const myfile = $("#csvfile")[0].files[0];
    this.parseData(myfile, this);
  }

  parseData(myfile, me) {
    debugger;
    const json = this.papa.parse(myfile, {
      header: true,
      skipEmptyLines: true,
      complete(results, file) {
        console.log("Dataframe:", results.data);
        console.log("Column names:", results.meta.fields);
        console.log("Errors:", results.errors);
        console.log(file);
        me.finalData = results.data;
      }
    });
  }
}
