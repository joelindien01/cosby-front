import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "./product";
import {Observable} from "rxjs/index";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"product/";

  constructor(private httpClient: HttpClient) {

  }

  saveProduct(product: any) {
    console.log(product);
    return this.httpClient.post(this.baseUrl, {productDTO: product, linkedProductsWithConfig: product.linkedProductsWithConfig});
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

  getProductLoadUrl(): string {
    return this.baseUrl + "load";
  }

  findLinkedProductsSetup(productId: number) {
    let params = new HttpParams({
      fromObject: {
        productId: productId.toString()
      }
    });
    return this.httpClient.get<any>(this.baseUrl+"find-linked-products", {params: params});
  }
}
