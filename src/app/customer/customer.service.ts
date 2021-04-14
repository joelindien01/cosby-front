import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Address, Contact, Customer, DeliveryInformation} from "./customer";
import {Observable} from "rxjs/index";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl;
  baseUrl = this.apiUrl+"customers/";

  public customerList: Array<Customer>;
  constructor(private http: HttpClient) { }

  addCustomer(customer:Customer): Observable<Customer> {
    console.log(customer);
    return this.http.post<Customer>(this.baseUrl,customer);
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

  editName(customerId: number, customerName: any) {
    return this.http.post(this.baseUrl+"update-name", {id: customerId, name: customerName});
  }

  editContact(customerId: number, contacts: Array<Contact>): Observable<any> {

    return this.http.post(this.baseUrl+"edit-contact", {id: customerId, contacts: contacts});
  }

  findCustomer(customerNameList: Array<string>): Observable<Array<Customer>> {
    let params = new HttpParams({
      fromObject: {
        customerNameList: customerNameList.join(',')
      }
    });
    return this.http.get<Array<Customer>>(this.baseUrl+"find", {params: params});
  }

  editAddress(customerId: number, addresses: [any]) {
    return this.http.post(this.baseUrl+"update-address", {id: customerId, address: addresses[0]});
  }
}
