import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ProductConstant } from '../product-constant';

import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators'
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { UploadService } from '../upload-service';
import { Upload } from '../upload';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  location = ProductConstant.Location;
  size = ProductConstant.Size;
  status = ProductConstant.Status;
  category = ProductConstant.Category;
  prodcollection: AngularFirestoreCollection<any>;
  def: Observable<any>;
  abc: any;
  rowData: any;
  private sub: Subscription;
  selectedFiles: FileList | null;
  currentUpload: Upload;
  finalUpload:Upload;
  image:any;
  constructor(private db: AngularFirestore, private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private upSvc: UploadService) {
    this.prodcollection = db.collection('products');

  }

  ngOnInit() {

    this.productForm = this.fb.group({
      product_code: { value: '', disabled: true },
      product_name: '',
      manfacturing_code: '',
      rent: '',
      procurement_cost: '',
      dop: '',
      category: '',
      location: '',
      size: '',
      color: '',
      vendor: '',
      status: 'Available',
      image:'',
      imageUrl:''

    });
    debugger;
    this.sub = this.route.queryParams.subscribe(
      params => {
        let code = params['product_code'];
        if (code) {
          this.getProduct(code);
        }

      }
    );
    //const storageRef = firebase.storage().ref('uploads/4.png');
    
  }
  productCodeGenerator() {
    debugger;
    var location = this.productForm.get('location').value;
    var category = this.productForm.get('category').value;
    if (location == "" || category == "") {
      alert("Please enter Location and Category");
      return false;
    }
    let queryProduct;
    var abc = this.db.collection('products', ref => {
      return ref
        .where('location', '==', location)
        .where('category', '==', category)
    });

    this.def = abc.valueChanges();
    this.def.subscribe((ref) => {
      queryProduct = ref;
      if (typeof queryProduct !== 'undefined' && queryProduct.length > 0) {
        var lastCode = queryProduct.reduce((max, p) => p.product_code > max ? p.product_code : max, queryProduct[0].product_code);
        var res = lastCode.split("-");
        var numCode = parseInt(res[2]) + 1;
        var str = "" + numCode;
        var pad = "000"
        var newNumCode = pad.substring(0, pad.length - str.length) + str;
      }
      else {
        var newNumCode = '001';
      }

      var code = location + '-' + category + '-' + newNumCode;
      this.productForm.patchValue({
        product_code: code
      });
    })




  }
  save() {
    debugger;
    this.prodcollection.doc(this.productForm.get('product_code').value).set({
      product_code: this.productForm.get('product_code').value,
      product_name: this.productForm.get('product_name').value,
      manfacturing_code: this.productForm.get('manfacturing_code').value,
      rent: this.productForm.get('rent').value,
      procurement_cost: this.productForm.get('procurement_cost').value,
      dop: this.productForm.get('dop').value,
      category: this.productForm.get('category').value,
      location: this.productForm.get('location').value,
      size: this.productForm.get('size').value,
      color: this.productForm.get('color').value,
      vendor: this.productForm.get('vendor').value,
      status: this.productForm.get('status').value,
      image:this.productForm.get('image').value,
      imageUrl:this.productForm.get('imageUrl').value
    });
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
  getProduct(product_code): void {
    debugger;
    this.rowData = this.prodcollection.doc(product_code).valueChanges();
    this.rowData.subscribe((data) => {
      console.log(data);
      this.productForm.patchValue({
        product_code: data.product_code,
        product_name: data.product_name,
        manfacturing_code: data.manfacturing_code,
        rent: data.rent,
        procurement_cost: data.procurement_cost,
        dop: data.dop,
        category: data.category,
        location: data.location,
        size: data.size,
        color: data.color,
        vendor: data.vendor,
        status: data.status
      });
    });

  }
  detectFiles($event: Event) {
    debugger;
    this.selectedFiles = ($event.target as HTMLInputElement).files;
}

uploadSingle() {
  debugger;
  const file = this.selectedFiles;
  if (file && file.length === 1) {
    this.currentUpload = new Upload(file.item(0));
    this.image= this.currentUpload.file.name;
    this.finalUpload = this.upSvc.pushUpload(this.currentUpload,this.productForm);
  } else {
    console.error('No file found!');
  }
}
}
