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
  selector: "app-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.scss"]
})
export class CategoryDetailComponent implements OnInit {
  location: string;
  category: string;
  productList: any[];
  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    debugger;
    this.location = this.route.snapshot.paramMap.get("location");
    this.category = this.route.snapshot.paramMap.get("category");
    const prod = this.db.collection("products", ref => {
      return ref
        .where("location", "==", this.location)
        .where("category", "==", this.category);
    });
    const prodSubscription = prod.valueChanges();
    prodSubscription.subscribe(data => {
      this.productList = data;
    });
  }
}
