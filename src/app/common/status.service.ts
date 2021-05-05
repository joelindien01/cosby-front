import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ObjectStatus} from "../purchase-order/list-purchase-orders/list-purchase-orders.component";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"status/";

  constructor(private httpClient:HttpClient) { }

  updateStatus(status: any) {
    return this.httpClient.post(this.baseUrl, status);
  }

  restore(status: ObjectStatus) {
    status.status = "LIVE";
    status.description = "";
    return this.updateStatus(status);
  }
}
