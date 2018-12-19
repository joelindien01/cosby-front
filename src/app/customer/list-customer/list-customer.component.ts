import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Address, Customer, EmailAddress} from '../customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList: Array<Customer>;

  constructor(private customerService: CustomerService) {
    const address = <Address> {id: 1, city: "", country: "", state: "", street: "", zipCode: ""};
    this.customerList = [{id: 1, location: address , phoneNumber: "234" , deliveryAddress: [address],
      billingAddress: address, contactEmailAddresses: [{id: 1, email: "test"}], name: ""}];
  }

  ngOnInit() {
  }

}
