import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule,AbstractControl,FormArray } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import validator from 'devextreme/ui/validator';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { v4 as uuid } from 'uuid';
import { orderConstant } from '../order-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Moment } from 'moment';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  panelOpenState: boolean = false;
  isLinear = false;
  isOpen = true;
  isLoading= true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  xyz: any = [];
  mode = orderConstant.paymentMode;
  returnType = orderConstant.rentType;
  rentReturnReason = orderConstant.rentRefundReason;
  securityDeductionReason = orderConstant.securityDeductionReason;
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
  filteredCustomerOptions: any;
  queryProduct: any;
  sub: any;
  isDisabled = false;
  isDeliveryDisabled = true;
  isdeliveryOpen = false;
  isReturnDisabled = true;
  isreturnOpen = false;
  orderData: any;
  bookingData: any;
  delData:any;
  minDate: Moment;
  rentReturn= false;
  securityDeduct = false;
  orderDate:any;
  startDate:any;
  endDate:any;
  actualDeliveryDate:any;
  actualReturnDate:any;
  get products(): FormArray{
    return <FormArray>this.thirdFormGroup.get('products');
  }
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private _formBuilder: FormBuilder, private db: AngularFirestore, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.prodcollection = db.collection('products');
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe((data) => {
      this.xyz = data;
    });
    this.custcollection = this.db.collection('customers');
    this.custSubscription = this.custcollection.valueChanges();
    this.custSubscription.subscribe((data) => {
      this.custData = data;
      this.isLoading= false;
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
      orderNumber: ['', [Validators.required,Validators.pattern('(PN|JP|LX|LN)-[0-9][0-9][0-9]')]],
      orderDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      product: [''],
      stateCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      subTotalAmount: [{ value: '', disabled: true }],
      advanceAmount: ['', Validators.required],
      mode: [''],
      advanceSecurity: [''],
      discount: [''],
      delivery: [''],
      grandTotal: ['']
    });
    this.fifthFormGroup = this._formBuilder.group({
      dueSecurity: [''],
      dueRent: [''],
      actualDeliveryDate: [''],
      dueRentMode: [''],
      dueSecurityMode: ['']
    });
    this.sixthFormGroup = this._formBuilder.group({
      returnType: [''],
      securityWithWrapd: [''],
      actualReturnDate: [''],
      securityReturnMode: [''],
      rentReturnAmount: [''],
      securityDeductionAmount:[''],
      rentReturnReason:[''],
      securityDeductionReason:[''],
      securityToRefund:['']
    });

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
    this.fourthFormGroup.get('delivery').valueChanges.subscribe((data) => {
      var grand = +this.fourthFormGroup.get('subTotalAmount').value + +this.fourthFormGroup.get('delivery').value - +this.fourthFormGroup.get('discount').value;
      this.fourthFormGroup.patchValue({
        grandTotal: grand,
      });
    });
    this.fourthFormGroup.get('discount').valueChanges.subscribe((data) => {
      var grandTotal = +this.fourthFormGroup.get('subTotalAmount').value + +this.fourthFormGroup.get('delivery').value - +this.fourthFormGroup.get('discount').value;
      this.fourthFormGroup.patchValue({
        grandTotal: grandTotal,
      });
    });
    this.secondFormGroup.get('orderDate').valueChanges.subscribe((data) => {
      this.minDate = data;
      console.log(data);
      if(data !="" && data != null){  this.orderDate=data.format('DD-MM-YYYY');}
    });
    this.secondFormGroup.get('startDate').valueChanges.subscribe((data) => {
      debugger;
      if(data !="" && data != null){ this.startDate = data.format('DD-MM-YYYY');}
   
      this.secondFormGroup.patchValue({
        endDate: moment(data).add(2, 'days'),
      });
    });
    this.secondFormGroup.get('endDate').valueChanges.subscribe((data) => {
      debugger;
      if(data !=""  && data != null){ this.endDate = data.format('DD-MM-YYYY');}
    });
    this.fifthFormGroup.get('actualDeliveryDate').valueChanges.subscribe((data) => {
      debugger;
      if(data !=""  && data != null){ this.actualDeliveryDate = data.format('DD-MM-YYYY');}
    });
    
    this.sixthFormGroup.get('returnType').valueChanges.subscribe((data) => {
      debugger;
      if(data=="RentRefund"){
        this.rentReturn = true;
        this.securityDeduct= false;
      }
     else if(data=="SecurityDeduction"){
        this.rentReturn = false;
        this.securityDeduct= true;
      }
      else{
        this.rentReturn = false;
        this.securityDeduct= false;
        this.sixthFormGroup.patchValue({
      rentReturnAmount: 0,
      securityDeductionAmount:0
          
        });
      }
    });
    this.sixthFormGroup.get('actualReturnDate').valueChanges.subscribe((data) => {
      var originalEndDate=moment(this.orderData.endDate,"DD-MM-YYYY");
      var actualEndDate=moment(data);
      var extraDays =  actualEndDate.diff(originalEndDate,'days');
      if(extraDays == 0)
{
      this.sixthFormGroup.patchValue({
        securityToRefund : this.sixthFormGroup.get('securityWithWrapd').value
          });
        }
        if(data !="" && data != null){ this.actualReturnDate = data.format('DD-MM-YYYY');}
    });
    this.sub = this.route.queryParams.subscribe(
      params => {
        let action = params['action'];
        let orderNumber = params['orderNumber'];
        if (action == "delivery") {
          this.isOpen= false;
          this.isDisabled= true;
          this.isDeliveryDisabled = false;
          this.isdeliveryOpen = true;
          this.deliveryData(orderNumber);
        }
        if (action == "return") {
          this.isOpen= false;
          this.isDisabled= true;
          this.isReturnDisabled = false;
          this.isreturnOpen = true;
          this.returnData(orderNumber);
        }

      }
    );
  }
  deliveryData(orderNumber) {
    var orderData = this.db.collection('orders').doc(orderNumber).valueChanges();
    orderData.subscribe((data) => {
      this.orderData = data;
    });
    var bookingData = this.db.collection('bookings').doc(orderNumber).valueChanges();
    bookingData.subscribe((ref) => {
      this.bookingData = ref;
    });

  }
 returnData(orderNumber) {
   let advanceSecurity;
   let dueSecurity;
   
    var orderData = this.db.collection('orders').doc(orderNumber).valueChanges();
    orderData.subscribe((data) => {
      this.orderData = data;
    });
    var bookingData = this.db.collection('bookings').doc(orderNumber).valueChanges();
    bookingData.subscribe((ref) => {
      this.bookingData = ref;
      this.sixthFormGroup.patchValue({
        securityWithWrapd: this.bookingData.advanceSecurity+ this.delData.dueSecurity,
      });
    });
    var deliveryData = this.db.collection('delivery').doc(orderNumber).valueChanges();
    deliveryData.subscribe((ref) => {
      this.delData = ref;
      this.sixthFormGroup.patchValue({
        securityWithWrapd: this.bookingData.advanceSecurity+ this.delData.dueSecurity,
      });
    });

  }
  addProduct():FormGroup{
return this._formBuilder.group({
  product: ''
});
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
  myFilter = (d: Moment): Moment => {
    // Prevent Monday from being selected.
    return (moment().day("Monday"));
  }
  productSelection(option) {
    console.log(option.option.value);
    this.productAvailabiltyCheck(option.option.value, this.secondFormGroup.get('startDate').value, this.secondFormGroup.get('endDate').value);
    this.proddoc = this.db.collection('products').doc(option.option.value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe((data) => {
      this.selectedProduct = data;
      this.fourthFormGroup.patchValue({
        subTotalAmount: data.rent,
        grandTotal: data.rent
      });
    });

  }
  customerSelection(option) {
    this.proddoc = this.db.collection('customers').doc(option.option.value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe((data) => {
      this.firstFormGroup.patchValue({
        name: data.name,
        address: data.address,
        pincode: data.pincode
      });
    });
    this.snackBar.open("Customer found in our List", "", { duration: 3000, });
  }
  saveOrder() {
    var bookingId = uuid();
    var dueRent = +this.fourthFormGroup.get('grandTotal').value - +this.fourthFormGroup.get('advanceAmount').value;
    var security = +this.fourthFormGroup.get('subTotalAmount').value * 2;
    var dueSecurity = security - this.fourthFormGroup.get('advanceSecurity').value;
    this.db.collection('orders').doc(this.secondFormGroup.get('orderNumber').value).set({
      name: this.firstFormGroup.get('name').value,
      phone: this.firstFormGroup.get('phone').value,
      address: this.firstFormGroup.get('address').value,
      pincode: this.firstFormGroup.get('pincode').value,
      orderNumber: this.secondFormGroup.get('orderNumber').value,
      orderDate: this.orderDate,
      startDate: this.startDate,
      endDate: this.endDate,
      product: this.thirdFormGroup.get('product').value,
      subTotalAmount: this.fourthFormGroup.get('subTotalAmount').value,
      delivery: this.fourthFormGroup.get('delivery').value,
      discount: this.fourthFormGroup.get('discount').value,
      grandTotal: this.fourthFormGroup.get('grandTotal').value,
      bookingId: bookingId,
      status: "Booked"
    })
    this.db.collection('bookings').doc(this.secondFormGroup.get('orderNumber').value).set({
      bookingId: bookingId,
      advanceAmount: this.fourthFormGroup.get('advanceAmount').value,
      advanceSecurity: this.fourthFormGroup.get('advanceSecurity').value,
      paymentMode: this.fourthFormGroup.get('mode').value,
      dueRent: dueRent,
      dueSecurity: dueSecurity

    });
    this.db.collection('productAvailability').doc(this.secondFormGroup.get('orderNumber').value).set({
      orderNumber: this.secondFormGroup.get('orderNumber').value,
      startDate: this.startDate,
      endDate: this.endDate,
      product: this.thirdFormGroup.get('product').value,
    });
    this.router.navigateByUrl('/orders');
  }
  saveDelivery(orderNumber) {
    debugger;
    var deliveryId = uuid();
    this.db.collection('orders').doc(orderNumber).update({
      deliveryId: deliveryId,
      status: "Delivered"
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    this.db.collection('delivery').doc(orderNumber).set({
      dueSecurity: this.fifthFormGroup.get('dueSecurity').value,
      dueRent: this.fifthFormGroup.get('dueRent').value,
      actualDeliveryDate: this.actualDeliveryDate,
      dueRentMode: this.fifthFormGroup.get('dueRentMode').value,
      dueSecurityMode: this.fifthFormGroup.get('dueSecurityMode').value,
      deliveryId: deliveryId
    });
    this.router.navigateByUrl('/orders');
  }
  saveReturn(orderNumber){
    debugger;
    var returnId = uuid();
    this.db.collection('orders').doc(orderNumber).update({
      returnId: returnId,
      status: "Returned"
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
      this.db.collection('return').doc(orderNumber).set({
        returnType: this.sixthFormGroup.get('returnType').value,
        securityWithWrapd: this.sixthFormGroup.get('securityWithWrapd').value,
        actualReturnDate: this.actualReturnDate,
        securityReturnMode: this.sixthFormGroup.get('securityReturnMode').value,
        rentReturnAmount: this.sixthFormGroup.get('rentReturnAmount').value,
        securityDeductionAmount:this.sixthFormGroup.get('securityDeductionAmount').value,
        rentReturnReason:this.sixthFormGroup.get('rentReturnReason').value,
        securityDeductionReason:this.sixthFormGroup.get('securityDeductionReason').value,
        securityToRefund:this.sixthFormGroup.get('securityToRefund').value,
        returnId: returnId,
      });
      this.router.navigateByUrl('/orders');  
  }
  productAvailabiltyCheck(product, startDate, endDate) {
    debugger;
    var inputStartDate = this.secondFormGroup.get('startDate').value;
    var inputEndDate = this.secondFormGroup.get('endDate').value;
    var productCollection = this.db.collection('productAvailability', ref => {
      return ref
        .where('product', '==', product)
    });
    var prod = productCollection.valueChanges();
    prod.subscribe((data) => {
      console.log(data);
      if(data.length>0){
      this.queryProduct = data[0];
  var a = moment(inputStartDate);
  var b =moment(this.queryProduct.startDate);
  var startDiffDays = a.diff(b, 'days');
  var c = moment(inputEndDate);
  var d = moment(this.queryProduct.endDate)
  var endDiffDays = c.diff(d, 'days');
  var totaldDiffDays = a.diff(c, 'days');

      if ((startDiffDays <= totaldDiffDays) && (endDiffDays <= totaldDiffDays)) {
        alert("Not Available");
      }}
    })
  }
}
export function ValidateProduct(control: AbstractControl) {
 var inputStartDate = this.secondFormGroup.get('startDate').value;
 var inputEndDate = this.secondFormGroup.get('endDate').value;
 var productCollection = this.db.collection('productAvailability', ref => {
  return ref
    .where('product', '==', control.value)
});
var prod = productCollection.valueChanges();
prod.subscribe((data) => {
  this.queryProduct = data[0];
  var a = moment(inputStartDate);
  var b =moment(this.queryProduct.startDate);
  var startDiffDays = a.diff(b);
  var c = moment(inputEndDate);
  var d = moment(this.queryProduct.endDate)
  var endDiffDays = c.diff(d);
  var totaldDiffDays = a.diff(c);
  if ((startDiffDays <= totaldDiffDays) && (endDiffDays <= totaldDiffDays)) {
    return { validProduct: true };
  }
  return null;
});
}