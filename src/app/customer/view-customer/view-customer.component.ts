import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Observable} from "rxjs/Rx";
import {Customer} from "../customer";
import {NgxSpinnerService} from "ngx-spinner";
import {ContactEditForm} from "./forms/contact-edit-form";
import {FormBuilder} from "@angular/forms";
import {ContactService} from "../../common/contact.service";

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
  public contactEditForm: ContactEditForm;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private contactService: ContactService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.fieldEdit = new CustomerEditActivationHandler();
    this.spinner.show();
    this.show = false;
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      if(customerId) {
        this.customer$ = this.customerService.findCustomerById(customerId);
        this.customer$.subscribe(customer => {
          this.currentCustomer = customer;
          this.contactEditForm = new ContactEditForm(this.fb, this.customerService, this.contactService, this.currentCustomer.id);
          setTimeout(() => {
            this.spinner.hide();
            this.show = true;
          }, 1500);
          });

      }
    })
  }

  updateContact() {
    if(this.contactEditForm.form.invalid) {
      return;
    }
    this.contactEditForm.edit('contacts').subscribe(contact => {
      this.currentCustomer.contacts.push(contact);
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

  addContact() {

  }
}

class CustomerEditActivationHandler {
  name: boolean = false;

}
