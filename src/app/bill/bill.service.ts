import { Injectable } from '@angular/core';
import {BillDTO} from "./bill";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) {

  }

  saveBill(bill: BillDTO) {
    return this.httpClient.post("http://localhost:8080/bill", bill);
  }
}
