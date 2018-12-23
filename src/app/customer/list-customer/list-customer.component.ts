import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Address, Customer, EmailAddress} from '../customer';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList: Array<Customer>;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList = this.customerService.customerList;
  }

  ngOnInit() {
  }

  createPurchaseOrder(customerId: number) {
    this.router.navigateByUrl('/purchase-order/'+customerId).then();
  }

  goToPurchaseOrdersPage(customerId: number) {
    this.router.navigate(['/purchase-orders', {customerId: customerId}]).then();
  }

  goToBillsPage(customerId: number) {
    this.router.navigate(['/bills', {customerId: customerId}]).then();
  }
}
