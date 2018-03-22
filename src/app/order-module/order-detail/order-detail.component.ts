import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
  orderData: any;
  bookingData: any;
  deliveryData: any;
  returnData: any;
  orderNumber: any;
  sub: any;
  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.orderNumber = params["orderNumber"];
      this.detailData();
    });
  }
  detailData() {
    const orderData = this.db
      .collection("orders")
      .doc(this.orderNumber)
      .valueChanges();
    orderData.subscribe(data => {
      this.orderData = data;
    });
    const bookingData = this.db
      .collection("bookings")
      .doc(this.orderNumber)
      .valueChanges();
    bookingData.subscribe(ref => {
      this.bookingData = ref;
    });
    const deliveryData = this.db
      .collection("delivery")
      .doc(this.orderNumber)
      .valueChanges();
    deliveryData.subscribe(ref => {
      this.deliveryData = ref;
    });
    const returnData = this.db
      .collection("return")
      .doc(this.orderNumber)
      .valueChanges();
    returnData.subscribe(ref => {
      this.returnData = ref;
    });
  }
}
