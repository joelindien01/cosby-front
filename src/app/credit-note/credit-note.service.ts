import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Bill, BillDTO} from "../bill/bill";
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
export class CreditNote {
  id: number;
  creationDate: Date;
  creditedAmount: number;
  netToBeDeducted: number;
}
@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"credit-note/";
  constructor(private httpClient: HttpClient, private docGenerator: DocGeneratorService) { }

  saveCreditNote(creditNote: CreditNote) {
    return this.httpClient.post(this.baseUrl, creditNote);
  }

  generateCreditNote(cn: CreditNoteDocData) {
    let docGeneratorHelper = new FileGeneratorHelper();
    docGeneratorHelper.outputName = "credit_note"+
      "_"+cn.id+ "_" +
      new Date().toISOString();
    docGeneratorHelper.templateName = "credit_note";
    docGeneratorHelper.data = cn;

    this.docGenerator.generateFile(docGeneratorHelper);

  }

  findCreditNoteById() {

  }

  /*generateDeliveryNote(deliveryNoteId: number) {
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
  }*/

}
export class CreditNoteDocData {
  vessel: string;
  creationDate: Date;
  id: number;
  billId: number;
  creditedAmount: number;
  netToBeDeducted: number;
}
