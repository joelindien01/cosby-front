import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Item, ItemDto, PurchaseOrder, PurchaseOrderDTO} from "./PurchaseOrder";
import {Observable} from "rxjs/Rx";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  apiUrl = environment.apiUrl;
  baseUrl= apiUrl+"purchase-order/";

  constructor(private httpClient: HttpClient) {
  }

  createOrder(purchaseOrderDTO: PurchaseOrderDTO) {
    return this.httpClient.post(this.baseUrl, purchaseOrderDTO);
  }

  getOrderByCustomerId(customerId: number): Observable<Array<PurchaseOrder>> {
    let params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<PurchaseOrder>>(this.baseUrl,{params: params});
  }

  findAll(): Observable<Array<PurchaseOrder>> {
    return this.httpClient.get<Array<PurchaseOrder>>(this.baseUrl);
  }

  findById(purchaseOrderId: number): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.baseUrl+purchaseOrderId);
  }

  findItemsByOrderId(purchaseOrderId: number) {
    return this.httpClient.get<Array<ItemDto>>(this.baseUrl+purchaseOrderId+"/items");
  }
}
