import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PurchaseOrder, PurchaseOrderDTO} from "./PurchaseOrder";
import {Address} from "../customer/customer";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private httpClient: HttpClient) {
  }

  createOrder(purchaseOrderDTO: PurchaseOrderDTO) {
    return this.httpClient.post("http://localhost:8080/purchase-order/", purchaseOrderDTO);
  }

  getOrderByCustomerId(customerId: number) {
    let params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get("http://localhost:8080/purchase-order/",{params: params});
  }

}
