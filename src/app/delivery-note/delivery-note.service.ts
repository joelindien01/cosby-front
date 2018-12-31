import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DeliveryNote, DeliveryNoteDTO} from "../purchase-order/PurchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private httpClient: HttpClient) { }

  saveDeliveryNote(deliveryNoteDTO: DeliveryNoteDTO): Observable<any> {
    return this.httpClient.post("http://localhost:8080/delivery-note", deliveryNoteDTO);
  }

  getDeliveryNotesByCustomerId(customerId: number): Observable<Array<DeliveryNote>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<DeliveryNote>>("http://localhost:8080/delivery-note/search", {params: params});
  }

  generateDeliveryNote(deliveryNoteId: number) {
    const params = new HttpParams({
      fromObject: {
        deliveryNoteId: deliveryNoteId.toString()
      }
    });
    return this.httpClient.get<Array<DeliveryNote>>("http://localhost:8080/delivery-note/generate", {params: params});
  }

  sendDeliveryNoteByEmail(deliveryNoteId: number) {

  }
}
