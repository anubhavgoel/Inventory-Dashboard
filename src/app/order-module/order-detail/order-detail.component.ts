import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderData:any;
  bookingData:any;
  deliveryData:any;
  returnData:any;
  orderNumber:any;
  sub:any;
  constructor(private db: AngularFirestore,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(
      params => {
        this.orderNumber = params['orderNumber'];
        this.detailData();
      }
    );
   
  }
  detailData(){
    var orderData = this.db.collection('orders').doc(this.orderNumber).valueChanges();
    orderData.subscribe((data) => {
      this.orderData = data;
    });
    var bookingData = this.db.collection('bookings').doc(this.orderNumber).valueChanges();
    bookingData.subscribe((ref) => {
      this.bookingData = ref;
     
    });
    var deliveryData = this.db.collection('delivery').doc(this.orderNumber).valueChanges();
    deliveryData.subscribe((ref) => {
      this.deliveryData = ref;
    });
    var returnData = this.db.collection('return').doc(this.orderNumber).valueChanges();
    returnData.subscribe((ref) => {
      this.returnData = ref;
    });
  }

}
