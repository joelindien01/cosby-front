import { Injectable } from '@angular/core';
import {Bill, BillDTO} from "./bill";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) {

  }

  saveBill(bill: BillDTO) {
    return this.httpClient.post("http://localhost:8080/bill", bill);
  }

  getBillsByCustomerId(customerId: number): Observable<Array<Bill>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<Bill>>("http://localhost:8080/bill/search", {params: params});
  }

  generateBill(billId: number) {
    const params = new HttpParams({
      fromObject: {
        billId: billId.toString()
      }
    });
    return this.httpClient.get<Array<Bill>>("http://localhost:8080/bill/generate", {params: params});
  }

  sendBillByEmail(billId: number) {

  }
}
