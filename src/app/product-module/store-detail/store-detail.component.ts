import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase";
import { firestore } from "firebase";
import { ProductConstant } from "../product-constant";
@Component({
  selector: "app-store-detail",
  templateUrl: "./store-detail.component.html",
  styleUrls: ["./store-detail.component.scss"]
})
export class StoreDetailComponent implements OnInit {
  category = ProductConstant.Category;
  prodcollection: AngularFirestoreCollection<any>;
  prodSubscription: any;
  productList: any;
  sub: any;
  location: any;
  dynamicHeight = false;
  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.prodcollection = db.collection("products");
  }

  ngOnInit() {
    this.sub = this.route.snapshot.paramMap.get("location");
    this.getProduct();
  }
  getProduct() {
    this.prodcollection = this.db.collection("products", ref => {
      return ref.where("location", "==", this.sub);
    });
    this.prodSubscription = this.prodcollection.valueChanges();
    this.prodSubscription.subscribe(data => {
      this.productList = data;
    });
  }
}
