import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import validator from 'devextreme/ui/validator';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  panelOpenState: boolean = false;
  isLinear = false;
  isOpen = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  xyz: any = [];
  isLoadingResults = true;
  prodcollection: AngularFirestoreCollection<any>;
  custcollection: AngularFirestoreCollection<any>;
  custSubscription: any;
  custData: any = [];
  proddoc: AngularFirestoreDocument<any>;
  test: any;
  selectedProduct: any;
  filteredOptions: any;
  filteredProductOptions: any;
  filteredCustomerOptions:any;
  queryProduct:any;
  constructor(private _formBuilder: FormBuilder, private db: AngularFirestore, public snackBar: MatSnackBar) {
    this.prodcollection = db.collection('products');
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe((data) => {
      this.xyz = data;
    });
    this.custcollection = this.db.collection('customers');
    this.custSubscription = this.custcollection.valueChanges();
    this.custSubscription.subscribe((data) => {
      debugger;
      this.custData = data;
    });

  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      pincode: ['']

    });
    this.secondFormGroup = this._formBuilder.group({
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      product: ['', Validators.required],
      stateCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      advanceAmount: ['', Validators.required],
      advanceSecurity: [''],
      discount: [''],
      delivery: ['']
    });
   
    // this.firstFormGroup.get('phone').valueChanges.subscribe((data) => {
    //   this.filteredOptions = this.filter(data);
    //   if (this.filteredOptions.length > 0) {
    //     this.snackBar.open("User Found", "", {
    //       duration: 3000,
    //     });
    //     this.firstFormGroup.patchValue({
    //       name: this.filteredOptions[0].name,
    //       address: this.filteredOptions[0].address,
    //       pincode: this.filteredOptions[0].pincode
    //     });
    //   }
    // });
    this.filteredCustomerOptions = this.firstFormGroup.get('phone').valueChanges
    .pipe(
    startWith(''),
      map(val => this.filtercustomer(val))
    );
    this.filteredProductOptions = this.thirdFormGroup.get('product').valueChanges
      .pipe(
      startWith(''),
      map(val => this.filterProduct(val))
      );

  }
  filtercustomer(val: string): string[] {
    console.log(this.custData);
    return this.custData.filter(option =>
      option.phone.indexOf(val) === 0);
  }
  filterProduct(val: string): string[] {
    console.log(this.xyz);
    return this.xyz.filter(option =>
      option.product_code.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filter(val) {
    debugger;
    return this.custData.filter(option =>
      option.phone == val);
  }
  customerAdd() {
    debugger;
    this.custcollection.doc(this.firstFormGroup.get('phone').value).set({
      name: this.firstFormGroup.get('name').value,
      phone: this.firstFormGroup.get('phone').value,
      address: this.firstFormGroup.get('address').value,
      pincode: this.firstFormGroup.get('pincode').value
    });
    this.snackBar.open("User Added", "", {
      duration: 3000,
    });
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Monday from being selected.
    return day !== 1;
  }
  productSelection(option) {
    console.log(option.option.value);
    this.productAvailabiltyCheck(option.option.value,this.secondFormGroup.get('startDate').value,this.secondFormGroup.get('endDate').value);
    this.proddoc = this.db.collection('products').doc(option.option.value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe((data) => {
      this.selectedProduct = data;
    });

  }
  customerSelection(option){
    this.proddoc = this.db.collection('customers').doc(option.option.value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe((data) => {
      this.firstFormGroup.patchValue({
               name: data.name,
               address: data.address,
               pincode: data.pincode
         });
    });
    this.snackBar.open("Customer found in our List", "", {duration: 3000,});
  }
  saveOrder() {
    this.db.collection('bookings').doc(this.secondFormGroup.get('orderNumber').value).set({
      name: this.firstFormGroup.get('name').value,
      phone: this.firstFormGroup.get('phone').value,
      address: this.firstFormGroup.get('address').value,
      pincode: this.firstFormGroup.get('pincode').value,
      orderNumber: this.secondFormGroup.get('orderNumber').value,
      orderDate: this.secondFormGroup.get('orderDate').value,
      startDate: this.secondFormGroup.get('startDate').value,
      endDate: this.secondFormGroup.get('endDate').value,
      product: this.thirdFormGroup.get('product').value,
      advanceAmount: this.fourthFormGroup.get('advanceAmount').value,
      AdvanceSecurity: this.fourthFormGroup.get('advanceSecurity').value,
      delivery: this.fourthFormGroup.get('delivery').value,
      discount: this.fourthFormGroup.get('discount').value,
    });
    this.db.collection('productAvailability').doc(this.secondFormGroup.get('orderNumber').value).set({
      orderNumber: this.secondFormGroup.get('orderNumber').value,
      startDate: this.secondFormGroup.get('startDate').value,
      endDate: this.secondFormGroup.get('endDate').value,
      product: this.thirdFormGroup.get('product').value,
    });
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.fourthFormGroup.reset();
  }
  productAvailabiltyCheck(product,startDate,endDate){
    var productCollection = this.db.collection('productAvailability', ref => {
      return ref
        .where('product', '==', product)
    });
    var prod = productCollection.valueChanges();
    prod.subscribe((data)=>{
console.log(data);
this.queryProduct = data[0];
var startTimeDiff = Math.abs(this.queryProduct.startDate.getTime() - startDate.getTime());
var startDiffDays = Math.ceil(startTimeDiff / (1000 * 3600 * 24)); 
var endTimeDiff = Math.abs(this.queryProduct.endDate.getTime() - endDate.getTime());
var endDiffDays = Math.ceil(endTimeDiff / (1000 * 3600 * 24)); 
var totalTimeDiff = Math.abs(startDate.getTime() - endDate.getTime());
var totaldDiffDays = Math.ceil(totalTimeDiff / (1000 * 3600 * 24)); 

if((startDiffDays  <=  totaldDiffDays)  &&  (endDiffDays  <=  totaldDiffDays))
		{
			alert("Not Available");
		}
    })
  }
}
