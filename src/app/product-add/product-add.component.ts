import { Component, OnInit } from '@angular/core';
import {Constant} from '../util/constant';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { PapaParseModule ,PapaParseService} from 'ngx-papaparse';
import { debug } from 'util';
declare var jquery:any;
declare var $ :any;
declare var finalData:any;

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  prodcollection: AngularFirestoreCollection<any>;
  model = new Product();
  finalData : any;
  batch:any;
  prodRef :any;
  constructor(db: AngularFirestore,private papa: PapaParseService) { 
debugger;
    this.prodcollection = db.collection('products');
    this.batch = db.firestore.batch();
    this.prodRef = db.firestore.collection("products");
  }


  ngOnInit() {
  }
  add(){
    
        debugger;
        var refDoc;
        for(var i=0;i<this.finalData.length;i++){
          refDoc = this.prodRef.doc(this.finalData[i].Product_Code);
          this.batch.set(refDoc, this.finalData[i]);
        }
        this.batch.commit();
   // this.prodcollection.doc("import").set(JSON.parse( JSON.stringify(this.finalData)));
    
    // this.prodcollection.doc(this.model.product_code).set({
    //   product_code: this.model.product_code,
    //   product_name: this.model.product_name,
    //   manfacturing_code: this.model.manfacturing_code,
    //   rent : this.model.rent,
    //   procurement_cost : this.model.procurement_cost,
    //   roi : this.model.roi,
    //   category: this.model.category,
    //   location: this.model.location,
    //   size: this.model.size,
    //   color:this.model.color,
    //   vendor:this.model.vendor,
    //   status:this.model.status
    // })

}

upload(anubhav){
  var myfile = $("#csvfile")[0].files[0];
this.parseData(myfile,this);
  

}

parseData(myfile,me) {
 var json= this.papa.parse(myfile, 
    {
    header: true, 
    skipEmptyLines: true,
    complete: function(results,file) {
        console.log("Dataframe:", results.data);
        console.log("Column names:", results.meta.fields);
        console.log("Errors:", results.errors);
        console.log(file);
        me.finalData= results.data;
    }
});

}
callback(results,file){

  console.log(results);

}

}

export class Product {
  
  constructor(
  

  ) {  }
    public product_code: string;
    public product_name: string;
    public manfacturing_code: string;
    public rent: number;
    public procurement_cost: number;
    public roi : number;
    public category : string;
    public location: string;
    public size: string;
    public color: string;
    public vendor :string;
    public status :string;
}