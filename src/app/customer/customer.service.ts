import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.baseUrl);
  }

  findCustomerById(customerId: number): Observable<Customer> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.http.get<Customer>(this.baseUrl+"search", {params: params});
  }

}
