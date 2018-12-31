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
  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      position: "right",
      custom: [
        {
          name: 'createPurchaseOrder',
          title: 'Create purchase order ',
        },
        {
          name: 'goToPurchaseOrdersPage',
          title: 'Purchase orders ',
        },
        {
          name: 'goToBillsPage',
          title: 'Bills ',
        },
        {
          name: 'goToDeliveryNotePage',
          title: 'Delivery notes',
        },
      ],
    },
    columns: {
      customerName: {
        title: 'Customer name',
        editable: false
      },
      locationCountry: {
        title: 'Location country',
        editable: false
      }
    }
  };

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList$ = this.customerService.getCustomers();
  }

  ngOnInit() {
  }

  createPurchaseOrder(customerId: number) {
    this.router.navigateByUrl('/purchase-order/' + customerId).then();
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

  onCustom($event: any) {
    const customer: Customer = $event.data;
    switch ($event.action) {
      case "createPurchaseOrder":
        this.createPurchaseOrder(customer.id);
        break;
      case "goToPurchaseOrdersPage":
        this.goToPurchaseOrdersPage(customer.id);
        break;
      case "goToBillsPage":
        this.goToBillsPage(customer.id);
        break;
      case "goToDeliveryNotePage":
        this.goToDeliveryNotePage(customer.id);
        break;
      default:
        console.log("unsupported action");
    }
  }
}
