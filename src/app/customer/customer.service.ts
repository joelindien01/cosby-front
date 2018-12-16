import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl="/customer/";
  constructor(private http: HttpClient) { }

  addCustomer(customer:Customer) {
    console.log(customer);
    return this.http.post("http://localhost:8080/customer/",customer);
  }
}
