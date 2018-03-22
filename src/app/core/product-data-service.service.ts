import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductDataServiceService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.http.get("https://reqres.in/api/products");
  }
}
