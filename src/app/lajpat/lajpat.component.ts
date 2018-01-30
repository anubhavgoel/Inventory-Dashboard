import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

declare var jquery:any;
declare var $ :any;

import{Product} from '../product';
@Component({
  selector: 'app-lajpat',
  templateUrl: './lajpat.component.html',
  styleUrls: ['./lajpat.component.scss'],
  providers: [ ApiService ]
})
export class LajpatComponent implements OnInit {
  category =['Sherwani','Lehenga','Indo Western','Coat','Gown','Anarkali'];
  btnText : string = '&criteria=Location=="Lajpat Nagar"%26%26Product_Category==';
  xyz : any;
  exist : any = false;
    constructor(public Apiservice : ApiService) { }
  
    ngOnInit(): void {
      this.getPosts(this.category[0]);
    }
    tabSelectionChanged(event){
     // this.moreContents = 'This tab will load some more contents after 5 seconds.';
  
      // Get the selected tab
      let selectedTab = event.tab;
      console.log(selectedTab);
  
      // Call some method that you want 
      this.getPosts(selectedTab.textLabel);
    }
    private getPosts(category : string) {
    let finalcriteria = this.btnText +"\""+ category +"\"" ;
      this.Apiservice.getAllProducts(finalcriteria).subscribe((data) => {
        debugger;
        this.xyz = JSON.parse(data._body);
        this.getImageSrc();
     });
  }
  getImageSrc(){
    console.log("inside image sourceeeeeeeeeeeeeeeeeeee")
    for(var i=0;i<this.xyz.Products.length;i++){
      this.xyz.Products[i].Image = 'https://creatorexport.zoho.com' + $(this.xyz.Products[i].Image).attr('src');
      if(this.xyz.Products[i].Image){
        this.exist = true;
      }
    }
  }

}
