import {Inject, Injectable} from '@angular/core';
import {Account, Bill, BillDTO} from "./bill";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import { environment } from '../../environments/environment';
import {Item} from "../purchase-order/PurchaseOrder";

export class BillData {
  vessel: string;
  contactPersonName: string;
  yourRef: string;
  billTo: string;
  creationDate: Date;
  port: string;
  deadLine: Date;
  deliveryNoteId: string;
  billId: string;
  deliveryFee: string;
  transportationFee: string;
  subTotal: number;
  discount: string;
  netTotal: string;
  el: Item[];
  impactedAccount: Account;
  ourSignatoryFunction: string;
  ourSignatory: string;
}


@Injectable({
  providedIn: 'root'
})
export class BillService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"bill/";

  constructor(private httpClient: HttpClient,
              private docGenerator: DocGeneratorService) {}

  saveBill(bill: BillDTO) {
    return this.httpClient.post(this.baseUrl, bill);
  }

  getBillsByCustomerId(customerId: number): Observable<Array<Bill>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<Bill>>(this.baseUrl+"search", {params: params});
  }

  generateBill(billId: number) {
    const params = new HttpParams({
      fromObject: {
        billId: billId.toString()
      }
    });
    this.httpClient
      .get<Bill>(this.baseUrl+"generate", {params: params})
      .subscribe(billData => {
        let docGeneratorHelper = new FileGeneratorHelper();
        docGeneratorHelper.outputName = "invoice"+
          "_"+billData.id+ "_" +
          billData.deliveryNote.purchaseOrder.customer.name+
          "_"+
          new Date().toISOString();
        docGeneratorHelper.templateName = "invoice_2";
        docGeneratorHelper.data = this.mapBillData(billData);
        this.docGenerator.generateFile(docGeneratorHelper);
    });
  }

  sendBillByEmail(billId: number) {

  }

  findAll() {
    return this.httpClient.get<Array<Bill>>(this.baseUrl+"search");
  }

  findBillById(billId: number): Observable<BillDTO> {
    return this.httpClient.get<BillDTO>(this.baseUrl+billId);
  }

  findbills(searchForm: any) {
    return this.httpClient.post<Array<Bill>>(this.baseUrl+"search", searchForm);
  }

  private mapBillData(bill: Bill) {
    let billData: BillData = new BillData();
    billData.vessel = bill.deliveryNote.purchaseOrder.deliveryInformation.vessel;
    billData.contactPersonName = bill.deliveryNote.purchaseOrder.customer.contacts[0].name;
    billData.yourRef = bill.deliveryNote.purchaseOrder.poNumber;
    billData.billTo = bill.deliveryNote.purchaseOrder.customer.name;
    billData.creationDate = bill.creationDate;
    billData.port = bill.deliveryNote.purchaseOrder.deliveryInformation.port;
    billData.deadLine = bill.deadLine;
    billData.deliveryNoteId = bill.deliveryNote.id.toString();
    billData.el = bill.deliveryNote.purchaseOrder.itemList;
    billData.deliveryFee = bill.deliveryFee.toString();
    billData.transportationFee = bill.transportationFee.toString();
    billData.subTotal = bill.deliveryNote.purchaseOrder.totalAmount;
    billData.netTotal = bill.netTotal.toString();
    billData.discount = bill.discount.toString();
    billData.impactedAccount = bill.impactedAccount;
    billData.ourSignatory = bill.ourSignatory;
    billData.ourSignatoryFunction = bill.ourSignatoryFunction;
    billData.billId = bill.id.toString();

    return billData;
  }


}

