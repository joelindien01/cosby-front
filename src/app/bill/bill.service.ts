import {Inject, Injectable} from '@angular/core';
import {Bill, BillDTO} from "./bill";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import { environment } from '../../environments/environment';

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
      .get<any>(this.baseUrl+"generate", {params: params})
      .subscribe(billData => {
        let docGeneratorHelper = new FileGeneratorHelper();
        docGeneratorHelper.outputName = "invoice"+
          "_"+billData.id+ "_" +
          billData.deliveryNote.purchaseOrder.customer.name+
          "_"+
          new Date().toISOString();
        docGeneratorHelper.templateName = "invoice_2";
        docGeneratorHelper.data = billData;
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
}
