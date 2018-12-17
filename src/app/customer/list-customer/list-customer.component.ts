import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList: Array<Customer>;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

}
