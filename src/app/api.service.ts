import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { Product } from "./product";
const API_URL = environment.apiUrl;
const Shipment_URL = environment.deliveryUrl;
const orders_URL = environment.ordersUrl;

@Injectable()
export class ApiService {
  data: any = [];
  constructor(private http: Http) {}

  /* public getAllTodos(): Observable<Product[]> {
    return this.http
      .get(API_URL)
      .map(response => {
        const products = response.json();
        return products.map((product) => new Product(product));
      });
  }*/

  public getAllProducts(store): any {
    const finalUrl = API_URL + store;
    return this.http.get(finalUrl);
  }
  public getProduct(product_code): any {
    const finalUrl = API_URL + "&criteria=Product_Code==\"" + product_code + "\"";
    return this.http.get(finalUrl);
  }

  public getAllShipments(): any {
    const finalUrl = Shipment_URL;
    return this.http.get(finalUrl);
  }

  public getAllOrders(): any {
    const finalUrl = orders_URL;
    return this.http.get(finalUrl);
  }
}
