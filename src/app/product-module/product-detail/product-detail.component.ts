import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  xyz: any;
  isLoadingResults = true;
  prodcollection: AngularFirestoreDocument<any>;
  test: any;
  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    const product_code = this.route.snapshot.paramMap.get("id");
    this.prodcollection = db.collection("products").doc(product_code);
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe(data => {
      this.xyz = data;
      console.log(this.xyz);
    });
  }

  ngOnInit() {}
}
