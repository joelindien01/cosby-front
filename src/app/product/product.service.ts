import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "./product";
import {Observable} from "rxjs/index";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl="http://localhost:8081/product/";

  constructor(private httpClient: HttpClient) {

  }

  saveProduct(product: Product) {
    console.log(product);
    return this.httpClient.post(this.baseUrl, product);
  }

  findProductByName(productToFound: string): Observable<Product[]> {
    const params = new HttpParams({
      fromObject: {
        productName: productToFound
      }
    });

    return this.httpClient.get<Product[]>(this.baseUrl,{params: params});
  }

  findAll() {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  findProductById(productId: number): Observable<Product> {

    return this.httpClient.get<Product>(this.baseUrl+productId);
  }

  findProduct(productNameList: Array<string>) {
    let params = new HttpParams({
      fromObject: {
        productNameList: productNameList.join(',')
      }
    });
    return this.httpClient.get<Product[]>(this.baseUrl+"find", {params: params});

  }
}
