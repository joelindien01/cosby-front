import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {Router} from "@angular/router";
import {Observable} from 'rxjs';
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: Observable<Array<Customer>>;
  customerTableData$: Observable<Array<CustomerTable>>;
  customerList: Array<Customer>;


  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList$ = this.customerService.getCustomers();
    this.customerTableData$ = this.customerList$.pipe(
      map(customerList => customerList.map(customer => new CustomerTable(customer.id, customer.name, customer.location.country)))
    );
    this.customerList$.subscribe(customerList => this.customerList = customerList);
  }

  ngOnInit() {
  }

  createPurchaseOrder(customerId: number) {
    this.router.navigate(['/purchase-order', {customerId: customerId}]).then();
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

  goToCustomerViewInfo(customerId: number) {
    this.router.navigate(['/customer', {customerId: customerId}]).then();
  }
}

export class CustomerTable {
  id;
  name;
  locationCountry;

  constructor(id, name, locationCountry) {
    this.id = id;
    this.name = name;
    this.locationCountry = locationCountry;
  }
}
