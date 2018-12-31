import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "./product";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {

  }

  saveProduct(product: Product) {
    console.log(product);
    return this.httpClient.post("http://localhost:8080/product/", product);
  }

  findProductByName(productToFound: string): Observable<Product[]> {
    const params = new HttpParams({
      fromObject: {
        productName: productToFound
      }
    });

    return this.httpClient.get<Product[]>("http://localhost:8080/product/",{params: params});
  }
}
