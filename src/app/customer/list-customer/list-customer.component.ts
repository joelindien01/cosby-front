import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Address, Customer, EmailAddress} from '../customer';
import {Router} from "@angular/router";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: Observable<Array<Customer>>;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList$ = this.customerService.getCustomers();
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

  goToDeliveryNotePage(customerId: number) {
    this.router.navigate(['/delivery-notes', {customerId: customerId}]).then();
  }
}
