import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "./product";
import {Observable} from "rxjs/index";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  afuConfig = {
    multiple: true,
    formatsAllowed: ".xlsx",
    maxSize: "20",
    uploadAPI:  {
      method:"POST",
      url: ''
      /*headers: {
        "Content-Type" : "text/plain;charset=UTF-8",
        "Authorization" : `Bearer ${token}`
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',*/
    },

    /*theme: "dragNDrop",
    hideProgressBar: true,
hideResetBtn: true,
    hideSelectBtn: false,
    hideSelectBtn: true,
    fileNameIndex: true,*/
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };
  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"product/";

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

  getProductLoadUrl(): string {
    return this.baseUrl + "load";
  }

  getLoadItemsForPOUrl() {
    return this.baseUrl + "load-items";
  }
}
