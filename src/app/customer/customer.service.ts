import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address, Customer, DeliveryInformation} from "./customer";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl="http://localhost:8080/customers/";

  public customerList: Array<Customer>;
  constructor(private http: HttpClient) { }

  addCustomer(customer:Customer) {
    console.log(customer);
    return this.http.post(this.baseUrl,customer);
  }

  getCustomers() {
    return this.http.get(this.baseUrl);
  }
}
