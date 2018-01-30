import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import{Product} from './product';
const API_URL = environment.apiUrl;
const Shipment_URL = environment.deliveryUrl;
const orders_URL = environment.ordersUrl;

@Injectable()
export class ApiService {
  data : any=[];
  constructor(private http: Http) { }

 /* public getAllTodos(): Observable<Product[]> {
    return this.http
      .get(API_URL)
      .map(response => {
        const products = response.json();
        return products.map((product) => new Product(product));
      });
  }*/

  public getAllProducts(store):any{
   var finalUrl = API_URL + store ; 
   debugger;
   return this.http.get(finalUrl);
   
  }
  public getProduct(product_code):any{
    var finalUrl = API_URL + '&criteria=Product_Code=="'+ product_code +"\""; 
    debugger;
    return this.http.get(finalUrl);
    
   }

  public getAllShipments():any{
    var finalUrl = Shipment_URL; 
    debugger;
    return this.http.get(finalUrl);
    
   }

   public getAllOrders():any{
    var finalUrl = orders_URL; 
    debugger;
    return this.http.get(finalUrl);
    
   }

}
