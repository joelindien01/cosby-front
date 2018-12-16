import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./product";

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
}
