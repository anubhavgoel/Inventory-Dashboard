import { Component, OnInit } from "@angular/core";
import { locateHostElement } from "@angular/core/src/render3/instructions";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase";
import { firestore } from "firebase/app";
import { TagInputModule } from "ngx-chips";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs/Subscription";
import { ProductConstant } from "../product-constant";
import { Upload } from "../upload";
import { UploadService } from "../upload-service";
@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"]
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
  finalUpload: Upload;
  image: any;
  toppings = new FormControl();
  linkForm = false;
  similarProducts: any;
  toppingList = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato"
  ];
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private upSvc: UploadService
  ) {
    this.prodcollection = db.collection("products");
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      product_code: { value: "", disabled: true },
      product_name: "",
      manfacturing_code: "",
      rent: "",
      procurement_cost: "",
      dop: "",
      category: "",
      location: "",
      size: "",
      color: "",
      vendor: "",
      status: "Available",
      image: "",
      imageUrl: "",
      similarProducts: ""
    });
    this.sub = this.route.queryParams.subscribe(params => {
      const code = params["product_code"];
      if (code) {
        this.getProduct(code);
      }
    });
  }
  productCodeGenerator() {
    debugger;
    const location = this.productForm.get("location").value;
    const category = this.productForm.get("category").value;
    if (location === "" || category === "") {
      alert("Please enter Location and Category");
      return false;
    }
    let queryProduct;
    const abc = this.db.collection("products", ref => {
      return ref
        .where("location", "==", location)
        .where("category", "==", category);
    });

    this.def = abc.valueChanges();
    this.def.subscribe(ref => {
      queryProduct = ref;
      let newNumCode;
      if (typeof queryProduct !== "undefined" && queryProduct.length > 0) {
        const lastCode = queryProduct.reduce(
          (max, p) => (p.product_code > max ? p.product_code : max),
          queryProduct[0].product_code
        );
        const res = lastCode.split("-");
        const numCode = parseInt(res[2]) + 1;
        const str = "" + numCode;
        const pad = "000";
        newNumCode = pad.substring(0, pad.length - str.length) + str;
      } else {
        newNumCode = "001";
      }

      const code = location + "-" + category + "-" + newNumCode;
      this.productForm.patchValue({
        product_code: code
      });
    });
  }
  save() {
    debugger;
    this.prodcollection.doc(this.productForm.get("product_code").value).set({
      product_code: this.productForm.get("product_code").value,
      product_name: this.productForm.get("product_name").value,
      manfacturing_code: this.productForm.get("manfacturing_code").value,
      rent: this.productForm.get("rent").value,
      procurement_cost: this.productForm.get("procurement_cost").value,
      dop: this.productForm.get("dop").value,
      category: this.productForm.get("category").value,
      location: this.productForm.get("location").value,
      size: this.productForm.get("size").value,
      color: this.productForm.get("color").value,
      vendor: this.productForm.get("vendor").value,
      status: this.productForm.get("status").value,
      image: this.productForm.get("image").value,
      imageUrl: this.productForm.get("imageUrl").value,
      similarProducts: this.productForm.get("similarProducts").value
    });
    this.productForm.reset();
    this.router.navigate(["/products"]);
  }
  getProduct(product_code): void {
    this.rowData = this.prodcollection.doc(product_code).valueChanges();
    this.rowData.subscribe(data => {
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
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.image = this.currentUpload.file.name;
      this.finalUpload = this.upSvc.pushUpload(
        this.currentUpload,
        this.productForm
      );
    } else {
      console.error("No file found!");
    }
  }
  link() {
    const category = this.productForm.get("category").value;
    let prod;
    const abc = this.db.collection("products", ref => {
      return ref.where("category", "==", category);
    });
    prod = abc.valueChanges();
    prod.subscribe(ref => {
      this.similarProducts = ref.map((value, index, array) => {
        return value.product_code;
      });
      this.linkForm = true;
    });
  }
}
