import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
xyz:any;
  constructor(public Apiservice : ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    let product_code = this.route.snapshot.paramMap.get('Product_Code');
    this.Apiservice.getProduct(product_code).subscribe((data) => {
      this.xyz = JSON.parse(data._body);
   });
  }

}
