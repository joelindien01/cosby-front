import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PurchaseOrder} from "./PurchaseOrder";
import {Address} from "../customer/customer";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  purchaseOrderList: Array<PurchaseOrder> = [];
  public address = <Address> {id: 1, city: "city test", country: "country test", state: "state test", street: "street test", zipCode: "zipcode test"};

  public customer = {id: 1, location: this.address , phoneNumber: "234" , deliveryAddress: [this.address],
    billingAddress: this.address, contactEmailAddresses: [{id: 1, email: "test"}], name: "test"};
  public customerList = [this.customer];

  constructor(private httpClient: HttpClient) {
    /*const order: PurchaseOrder = {id: 1, itemList: [], customer: this.customer, deliveryAddress: this.address};
    this.purchaseOrderList.push(order);*/
  }

  createOrder(purchaseOrder: PurchaseOrder) {
    return this.httpClient.post("http://localhost:8080/purchase-order/",purchaseOrder);
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
