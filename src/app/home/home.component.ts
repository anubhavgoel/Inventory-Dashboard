import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';
import { ApiService } from '../api.service';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ApiService ]
})
export class HomeComponent implements OnInit {

btnText : string = '&criteria=Location=="Lajpat Nagar"';
xyz : any;
  constructor(public Apiservice : ApiService) { }

  ngOnInit(): void {
    this.getPosts();
  }
  private getPosts() {
    this.Apiservice.getAllProducts(this.btnText).subscribe((data) => {
      debugger;
      this.xyz = JSON.parse(data._body);
      this.getImageSrc();
   });
}
getImageSrc(){
  console.log("inside image sourceeeeeeeeeeeeeeeeeeee")
  for(var i=0;i<this.xyz.Products.length;i++){
    this.xyz.Products[i].Image = 'https://creatorexport.zoho.com' + $(this.xyz.Products[i].Image).attr('src');
  }
}
}
