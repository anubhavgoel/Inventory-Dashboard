import { Component, OnInit } from '@angular/core';
import { ProductConstant } from '../product-constant';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  category = ProductConstant.Category;
  prodcollection: AngularFirestoreCollection<any>;
  prodSubscription:any;
  productList:any;
  sub:any;
  location:any;
  dynamicHeight= false;
  constructor(private db: AngularFirestore,private route: ActivatedRoute,private router: Router) {
    this.prodcollection = db.collection('products');
   }

  ngOnInit() {
    debugger;
    this.sub = this.route.snapshot.paramMap.get('location');
    this.getProduct(this.category[0].value);
    
  }
  tabSelectionChanged(event){
    // this.moreContents = 'This tab will load some more contents after 5 seconds.';
 
     // Get the selected tab
     let selectedTab = event.tab;
     console.log(selectedTab);
     debugger;
     this.getProduct(selectedTab.textLabel);
   }
getProduct(category:string){
  this.prodcollection = this.db.collection('products', ref => {
    return ref
      .where('location', '==', this.sub)
      .where('category', '==', category)
  });
  this.prodSubscription = this.prodcollection.valueChanges();
  this.prodSubscription.subscribe((data) => {
    this.productList = data;
  });
}
}
