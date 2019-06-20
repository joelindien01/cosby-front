import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DeliveryNote, DeliveryNoteDTO} from "../purchase-order/PurchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private httpClient: HttpClient) { }

  baseUrl="http://localhost:8081/delivery-note/";

  saveDeliveryNote(deliveryNoteDTO: DeliveryNoteDTO): Observable<any> {
    return this.httpClient.post(this.baseUrl, deliveryNoteDTO);
  }

  getDeliveryNotesByCustomerId(customerId: number): Observable<Array<DeliveryNote>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"search", {params: params});
  }

  generateDeliveryNote(deliveryNoteId: number) {
    const params = new HttpParams({
      fromObject: {
        deliveryNoteId: deliveryNoteId.toString()
      }
    });
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"generate", {params: params});
  }

  sendDeliveryNoteByEmail(deliveryNoteId: number) {

  }

  findAll() {
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"search");
  }

  findById(deliveryNoteId: number) {
    return this.httpClient.get<DeliveryNoteDTO>(this.baseUrl+deliveryNoteId);
  }
}


