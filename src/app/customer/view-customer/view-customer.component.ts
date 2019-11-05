import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Observable} from "rxjs/Rx";
import {Customer} from "../customer";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  public customer$: Observable<Customer>;
  public currentCustomer: Customer;
  public fieldEdit: CustomerEditActivationHandler;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {
    this.fieldEdit = new CustomerEditActivationHandler();
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      if(customerId) {
        this.customer$ = this.customerService.findCustomerById(customerId);
        this.customer$.subscribe(customer => this.currentCustomer = customer);

      }
    })
  }

  ngOnInit() {
  }
  addAddress() {

  }

  editName() {
    this.fieldEdit.name = true;

  }

  createPurchaseOrder() {
    this.router.navigate(['/purchase-order', {customerId: this.currentCustomer.id}]).then();
  }

  goToPurchaseOrdersPage() {
    this.router.navigate(['/purchase-orders', {customerId: this.currentCustomer.id}]).then();
  }

  goToBillsPage() {
    this.router.navigate(['/bills', {customerId: this.currentCustomer.id}]).then();
  }

  goToDeliveryNotePage() {
    this.router.navigate(['/delivery-notes', {customerId: this.currentCustomer.id}]).then();
  }
}

class CustomerEditActivationHandler {
  name: boolean = false;

}
