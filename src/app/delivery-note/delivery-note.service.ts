import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DeliveryNote, DeliveryNoteDTO, Item, PurchaseOrder} from "../purchase-order/PurchaseOrder";
import { environment } from '../../environments/environment';
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import {mergeMap} from "rxjs/operators";
import {PurchaseOrderService} from "../purchase-order/purchase-order.service";

export class DelNoteData{
  vessel: string;
  contact: string;
  yourRef: string;
  billTo: string;
  date: Date;
  port: string;
  deliveryNoteId;
  el: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(private httpClient: HttpClient, private docGenerator: DocGeneratorService, private poService: PurchaseOrderService) { }

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"delivery-note/";

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
    let delNoteReturned: any ;
    this.findById(deliveryNoteId).pipe(
      mergeMap((delNote) => {
        delNoteReturned = delNote;
        return this.poService.findById(delNote.purchaseOrderId)
      }))
      .subscribe( poData => {
        let docGeneratorHelper = new FileGeneratorHelper();
        docGeneratorHelper.outputName = "delivery_note"+
          "_"+delNoteReturned.id+ "_" +
          poData.customer.name+
          "_"+
          new Date().toISOString();
        docGeneratorHelper.templateName = "delivery_note";
        docGeneratorHelper.data = this.mapDelNote(delNoteReturned, poData);

        this.docGenerator.generateFile(docGeneratorHelper);


    });
  }

  sendDeliveryNoteByEmail(deliveryNoteId: number) {

  }

  findAll() {
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"search");
  }

  findById(deliveryNoteId: number) {
    return this.httpClient.get<DeliveryNoteDTO>(this.baseUrl+deliveryNoteId);
  }

  findNotes(searchForm: any) {
    return this.httpClient.post<Array<DeliveryNote>>(this.baseUrl+"find", searchForm);
  }

  private mapDelNote(delNoteReturned: any, poData: PurchaseOrder) {
    let delNote = new DelNoteData();
    delNote.deliveryNoteId = delNoteReturned.id;
    delNote.port = poData.deliveryInformation.port;
    delNote.billTo = poData.customer.name;
    delNote.vessel = poData.deliveryInformation.vessel;
    delNote.contact = poData.customer.contacts[0].name;
    delNote.yourRef = poData.poNumber;
    delNote.date = delNoteReturned.deliveryDate;
    delNote.el = poData.itemList;
    return delNote;
  }
}


