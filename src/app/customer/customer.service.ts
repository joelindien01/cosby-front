import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address, Customer} from "./customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl="/customer/";
  public address = <Address> {id: 1, city: "city test", country: "country test", state: "state test", street: "street test", zipCode: "zipcode test"};

  public customer = {id: 1, location: this.address , phoneNumber: "234" , deliveryAddress: [this.address],
    billingAddress: this.address, contactEmailAddresses: [{id: 1, email: "test"}], name: "test"};
  public customerList = [this.customer];
  constructor(private http: HttpClient) { }

  addCustomer(customer:Customer) {
    console.log(customer);
    return this.http.post("http://localhost:8080/customer/",customer);
  }
}
