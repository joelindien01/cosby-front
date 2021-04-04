import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Observable} from "rxjs/Rx";
import {Customer} from "../customer";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  public customer$: Observable<Customer>;
  public currentCustomer: Customer;
  public fieldEdit: CustomerEditActivationHandler;
  show;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router, private spinner: NgxSpinnerService) {
    this.fieldEdit = new CustomerEditActivationHandler();
    this.spinner.show();
    this.show = false;
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      if(customerId) {
        this.customer$ = this.customerService.findCustomerById(customerId);
        this.customer$.subscribe(customer => {
          this.currentCustomer = customer;
          setTimeout(() => {
            this.spinner.hide();
            this.show = true;
          }, 1500);
          });

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
  addShip() {

  }
}

class CustomerEditActivationHandler {
  name: boolean = false;

}
