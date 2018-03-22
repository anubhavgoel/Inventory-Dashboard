import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatFormField, MatFormFieldControl } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import validator from "devextreme/ui/validator";
import { Moment } from "moment";
import * as moment from "moment";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { v4 as uuid } from "uuid";
import { orderConstant } from "../order-constants";
@Component({
  selector: "app-order-add",
  templateUrl: "./order-add.component.html",
  styleUrls: ["./order-add.component.scss"]
})
export class OrderAddComponent implements OnInit {
  panelOpenState = false;
  isLinear = true;
  isOpen = true;
  isLoading = true;
  isProductSelected = false;
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
  selectedProduct: any = [];
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
  delData: any;
  minDate: Moment;
  rentReturn = false;
  securityDeduct = false;
  orderDate: any;
  startDate: any;
  endDate: any;
  actualDeliveryDate: any;
  actualReturnDate: any;
  conflictingDates: any;
  allProductsRent = 0;
  get allProducts(): FormArray {
    return this.thirdFormGroup.get("allProducts") as FormArray;
  }
  public mask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private db: AngularFirestore,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.prodcollection = db.collection("products");
    this.test = this.prodcollection.valueChanges();
    this.test.subscribe(data => {
      this.xyz = data;
      this.isLoading = false;
    });
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: [""],
      pincode: [""]
    });
    this.secondFormGroup = this._formBuilder.group({
      orderNumber: [
        "",
        [
          Validators.required,
          Validators.pattern("(PN|JP|LX|LN)-[0-9][0-9][0-9]")
        ]
      ],
      orderDate: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      allProducts: this._formBuilder.array([this.buildProducts()])
    });
    this.fourthFormGroup = this._formBuilder.group({
      subTotalAmount: [{ value: "", disabled: true }],
      advanceAmount: ["", Validators.required],
      mode: [""],
      advanceSecurity: [""],
      discount: [""],
      delivery: [""],
      grandTotal: [""]
    });
    this.fifthFormGroup = this._formBuilder.group({
      dueSecurity: [""],
      dueRent: [""],
      actualDeliveryDate: [""],
      dueRentMode: [""],
      dueSecurityMode: [""]
    });
    this.sixthFormGroup = this._formBuilder.group({
      returnType: [""],
      securityWithWrapd: [""],
      actualReturnDate: [""],
      securityReturnMode: [""],
      rentReturnAmount: [""],
      securityDeductionAmount: [""],
      rentReturnReason: [""],
      securityDeductionReason: [""],
      securityToRefund: [""]
    });

    this.filteredCustomerOptions = this.firstFormGroup
      .get("phone")
      .valueChanges.pipe(startWith(""), map(val => this.filtercustomer(val)));
    for (let i = 0; i < this.allProducts.controls.length; i++) {
      this.filteredProductOptions = this.allProducts
        .at(i)
        .get("product")
        .valueChanges.pipe(startWith(""), map(val => this.filterProduct(val)));
    }

    this.fourthFormGroup.get("delivery").valueChanges.subscribe(data => {
      const grand =
        +this.fourthFormGroup.get("subTotalAmount").value +
        +this.fourthFormGroup.get("delivery").value -
        +this.fourthFormGroup.get("discount").value;
      this.fourthFormGroup.patchValue({
        grandTotal: grand
      });
    });
    this.fourthFormGroup.get("discount").valueChanges.subscribe(data => {
      const grandTotal =
        +this.fourthFormGroup.get("subTotalAmount").value +
        +this.fourthFormGroup.get("delivery").value -
        +this.fourthFormGroup.get("discount").value;
      this.fourthFormGroup.patchValue({
        grandTotal
      });
    });
    this.secondFormGroup.get("orderDate").valueChanges.subscribe(data => {
      this.minDate = data;
    });
    this.secondFormGroup.get("startDate").valueChanges.subscribe(data => {
      this.secondFormGroup.patchValue({
        endDate: moment(data).add(2, "days")
      });
    });
    this.sixthFormGroup.get("returnType").valueChanges.subscribe(data => {
      if (data === "RentRefund") {
        this.rentReturn = true;
        this.securityDeduct = false;
      } else if (data === "SecurityDeduction") {
        this.rentReturn = false;
        this.securityDeduct = true;
      } else {
        this.rentReturn = false;
        this.securityDeduct = false;
        this.sixthFormGroup.patchValue({
          rentReturnAmount: 0,
          securityDeductionAmount: 0
        });
      }
    });
    this.sixthFormGroup.get("actualReturnDate").valueChanges.subscribe(data => {
      const originalEndDate = moment(this.orderData.endDate);
      const actualEndDate = moment(data);
      const extraDays = actualEndDate.diff(originalEndDate, "days");
      if (extraDays === 0) {
        this.sixthFormGroup.patchValue({
          securityToRefund: this.sixthFormGroup.get("securityWithWrapd").value
        });
      }
    });
    this.sub = this.route.queryParams.subscribe(params => {
      const action = params["action"];
      const orderNumber = params["orderNumber"];
      if (action === "delivery") {
        this.isOpen = false;
        this.isDisabled = true;
        this.isDeliveryDisabled = false;
        this.isdeliveryOpen = true;
        this.deliveryData(orderNumber);
      }
      if (action === "return") {
        this.isOpen = false;
        this.isDisabled = true;
        this.isReturnDisabled = false;
        this.isreturnOpen = true;
        this.returnData(orderNumber);
      }
    });
  }
  deliveryData(orderNumber) {
    const orderData = this.db
      .collection("orders")
      .doc(orderNumber)
      .valueChanges();
    orderData.subscribe(data => {
      this.orderData = data;
    });
    const bookingData = this.db
      .collection("bookings")
      .doc(orderNumber)
      .valueChanges();
    bookingData.subscribe(ref => {
      this.bookingData = ref;
    });
  }
  returnData(orderNumber) {
    let advanceSecurity;
    let dueSecurity;

    const orderData = this.db
      .collection("orders")
      .doc(orderNumber)
      .valueChanges();
    orderData.subscribe(data => {
      this.orderData = data;
    });
    const bookingData = this.db
      .collection("bookings")
      .doc(orderNumber)
      .valueChanges();
    bookingData.subscribe(ref => {
      this.bookingData = ref;
      this.sixthFormGroup.patchValue({
        securityWithWrapd:
          this.bookingData.advanceSecurity + this.delData.dueSecurity
      });
    });
    const deliveryData = this.db
      .collection("delivery")
      .doc(orderNumber)
      .valueChanges();
    deliveryData.subscribe(ref => {
      this.delData = ref;
      this.sixthFormGroup.patchValue({
        securityWithWrapd:
          this.bookingData.advanceSecurity + this.delData.dueSecurity
      });
    });
  }
  addProduct(): FormGroup {
    return this._formBuilder.group({
      product: ""
    });
  }
  filtercustomer(val: string): string[] {
    console.log(this.custData);
    return this.custData.filter(option => option.phone.indexOf(val) === 0);
  }
  filterProduct(val: string): string[] {
    console.log(this.xyz);
    return this.xyz.filter(
      option =>
        option.product_code.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }
  filter(val) {
    return this.custData.filter(option => option.phone === val);
  }
  customerAdd() {
    this.proddoc = this.db
      .collection("customers")
      .doc(this.firstFormGroup.get("phone").value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe(data => {
      if (data) {
      } else {
        this.custcollection.doc(this.firstFormGroup.get("phone").value).set({
          name: this.firstFormGroup.get("name").value,
          phone: this.firstFormGroup.get("phone").value,
          address: this.firstFormGroup.get("address").value,
          pincode: this.firstFormGroup.get("pincode").value
        });
        this.snackBar.open("User Added", "", {
          duration: 3000
        });
      }
    });

    this.snackBar.open("User Added", "", {
      duration: 3000
    });
  }
  myFilter = (d: Moment): Moment => {
    // Prevent Monday from being selected.
    return moment().day("Monday");
  };
  productSelection(option, index) {
    debugger;
    this.isProductSelected = true;
    this.productAvailabiltyCheck(
      option.option.value,
      this.secondFormGroup.get("startDate").value,
      this.secondFormGroup.get("endDate").value,
      index
    );
    this.proddoc = this.db.collection("products").doc(option.option.value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe(data => {
      this.selectedProduct[index] = data;
      this.allProducts.controls[index].get("rent").setValue(data.rent);
    });
  }
  customerSelection() {
    this.proddoc = this.db
      .collection("customers")
      .doc(this.firstFormGroup.get("phone").value);
    this.test = this.proddoc.valueChanges();
    this.test.subscribe(data => {
      if (data != null) {
        this.firstFormGroup.patchValue({
          name: data.name,
          address: data.address,
          pincode: data.pincode
        });

        this.snackBar.open("Customer found in our List", "", {
          duration: 3000
        });
      } else {
        this.snackBar.open("Customer not found in our List.Please Add", "", {
          duration: 3000
        });
      }
    });
  }
  saveOrder() {
    debugger;
    const bookingId = uuid();
    const dueRent =
      +this.fourthFormGroup.get("grandTotal").value -
      +this.fourthFormGroup.get("advanceAmount").value;
    const security = +this.fourthFormGroup.get("subTotalAmount").value * 2;
    const dueSecurity =
      security - this.fourthFormGroup.get("advanceSecurity").value;
    const products = [];
    for (const control of this.allProducts.controls) {
      products.push(control.get("product").value);
    }

    this.db
      .collection("orders")
      .doc(this.secondFormGroup.get("orderNumber").value)
      .set({
        name: this.firstFormGroup.get("name").value,
        phone: this.firstFormGroup.get("phone").value,
        address: this.firstFormGroup.get("address").value,
        pincode: this.firstFormGroup.get("pincode").value,
        orderNumber: this.secondFormGroup.get("orderNumber").value,
        orderDate: this.secondFormGroup.get("orderDate").value._d,
        startDate: this.secondFormGroup.get("startDate").value._d,
        endDate: this.secondFormGroup.get("endDate").value._d,
        product: products,
        subTotalAmount: this.fourthFormGroup.get("subTotalAmount").value,
        delivery: this.fourthFormGroup.get("delivery").value,
        discount: this.fourthFormGroup.get("discount").value,
        grandTotal: this.fourthFormGroup.get("grandTotal").value,
        // tslint:disable-next-line:object-literal-shorthand
        bookingId: bookingId,
        status: "Booked"
      });
    this.db
      .collection("bookings")
      .doc(this.secondFormGroup.get("orderNumber").value)
      .set({
        bookingId,
        advanceAmount: this.fourthFormGroup.get("advanceAmount").value,
        advanceSecurity: this.fourthFormGroup.get("advanceSecurity").value,
        paymentMode: this.fourthFormGroup.get("mode").value,
        dueRent,
        dueSecurity
      });
    products.map((value, index, array) => {
      this.db.collection("productAvailability").add({
        orderNumber: this.secondFormGroup.get("orderNumber").value,
        startDate: this.secondFormGroup.get("startDate").value._d,
        endDate: this.secondFormGroup.get("endDate").value._d,
        product: value
      });
    });

    this.router.navigateByUrl("/orders");
  }
  saveDelivery(orderNumber) {
    debugger;
    const deliveryId = uuid();
    this.db
      .collection("orders")
      .doc(orderNumber)
      .update({
        // tslint:disable-next-line:object-literal-shorthand
        deliveryId: deliveryId,
        status: "Delivered"
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    this.db
      .collection("delivery")
      .doc(orderNumber)
      .set({
        dueSecurity: this.fifthFormGroup.get("dueSecurity").value,
        dueRent: this.fifthFormGroup.get("dueRent").value,
        actualDeliveryDate: this.fifthFormGroup.get("actualDeliveryDate").value
          ._d,
        dueRentMode: this.fifthFormGroup.get("dueRentMode").value,
        dueSecurityMode: this.fifthFormGroup.get("dueSecurityMode").value,
        deliveryId
      });
    this.router.navigateByUrl("/orders");
  }
  saveReturn(orderNumber) {
    const returnId = uuid();
    this.db
      .collection("orders")
      .doc(orderNumber)
      .update({
        // tslint:disable-next-line:object-literal-shorthand
        returnId: returnId,
        status: "Returned"
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    this.db
      .collection("return")
      .doc(orderNumber)
      .set({
        returnType: this.sixthFormGroup.get("returnType").value,
        securityWithWrapd: this.sixthFormGroup.get("securityWithWrapd").value,
        actualReturnDate: this.sixthFormGroup.get("actualReturnDate").value._d,
        securityReturnMode: this.sixthFormGroup.get("securityReturnMode").value,
        rentReturnAmount: this.sixthFormGroup.get("rentReturnAmount").value,
        securityDeductionAmount: this.sixthFormGroup.get(
          "securityDeductionAmount"
        ).value,
        rentReturnReason: this.sixthFormGroup.get("rentReturnReason").value,
        securityDeductionReason: this.sixthFormGroup.get(
          "securityDeductionReason"
        ).value,
        securityToRefund: this.sixthFormGroup.get("securityToRefund").value,
        returnId
      });
    this.router.navigateByUrl("/orders");
  }
  productAvailabiltyCheck(product, startDate, endDate, i) {
    debugger;
    const inputStartDate = this.secondFormGroup.get("startDate").value;
    const inputEndDate = this.secondFormGroup.get("endDate").value;
    const productCollection = this.db.collection("productAvailability", ref => {
      return ref.where("product", "==", product);
    });
    const prod = productCollection.valueChanges();
    prod.subscribe(data => {
      this.conflictingDates = "";
      this.allProducts.controls[i].patchValue({
        status: "Available"
      });
      console.log(data);
      if (data.length > 0) {
        this.queryProduct = data;
        this.queryProduct.map((value, index, array) => {
          debugger;
          const a = moment(inputStartDate);
          const b = moment(value.startDate);
          const startDiffDays = Math.abs(a.diff(b, "days"));
          const c = moment(inputEndDate);
          const d = moment(value.endDate);
          const endDiffDays = Math.abs(c.diff(d, "days"));
          const totaldDiffDays = Math.abs(a.diff(c, "days"));
          if (
            startDiffDays <= totaldDiffDays &&
            endDiffDays <= totaldDiffDays
          ) {
            this.allProducts.controls[i]
              .get("product")
              .setErrors({ incorrect: true });
            this.conflictingDates = value;
          }
        });
      }
    });
  }
  resetProductForm() {
    this.conflictingDates = "";
    this.selectedProduct = [];
    this.thirdFormGroup.reset({
      product: "",
      status: "Available"
    });
  }

  buildProducts(): FormGroup {
    return this._formBuilder.group({
      product: ["", Validators.required],
      rent: [{ value: "", disabled: true }],
      status: [
        { value: "Available", disabled: true },
        [Validators.required, Validators.pattern("(Available)")]
      ]
    });
  }
  addNewProduct() {
    this.allProducts.push(this.buildProducts());
  }
  removeProduct(index) {
    this.allProducts.removeAt(index);
  }
  calculateTotalRent() {
    debugger;
    let allProductsRent = 0;
    for (let i = 0; i < this.allProducts.controls.length; i++) {
      allProductsRent =
        allProductsRent + +this.allProducts.controls[i].get("rent").value;
    }
    this.fourthFormGroup.patchValue({
      subTotalAmount: allProductsRent,
      grandTotal: allProductsRent
    });
  }
}
export function ValidateProduct(control: AbstractControl) {
  const inputStartDate = this.secondFormGroup.get("startDate").value;
  const inputEndDate = this.secondFormGroup.get("endDate").value;
  const productCollection = this.db.collection("productAvailability", ref => {
    return ref.where("product", "==", control.value);
  });
  const prod = productCollection.valueChanges();
  prod.subscribe(data => {
    this.queryProduct = data[0];
    const a = moment(inputStartDate);
    const b = moment(this.queryProduct.startDate);
    const startDiffDays = a.diff(b);
    const c = moment(inputEndDate);
    const d = moment(this.queryProduct.endDate);
    const endDiffDays = c.diff(d);
    const totaldDiffDays = a.diff(c);
    if (startDiffDays <= totaldDiffDays && endDiffDays <= totaldDiffDays) {
      return { validProduct: true };
    }
    return null;
  });
}
