import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressComponent} from "../../common/address/address.component";
import {AddressService} from "../../common/address.service";
import {CustomerService} from "../customer.service";
import {ShipService} from "../../common/ship.service";
import {ContactService} from "../../common/contact.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCustomerComponent implements OnInit {


  customerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private customerService: CustomerService,
              private shipService: ShipService,
              private contactService: ContactService) {
    this.customerForm = this.fb.group({
      name: ['',Validators.required],
      contacts: this.fb.array([this.contactService.initForm()]),
      billingAddress: this.addressService.initAddress(),
      location: this.addressService.initAddress(),
      deliveryInformations: this.fb.array([this.shipService.initShip()])
    });
  }

  ngOnInit() {

  }

  saveCustomer() {
    let customer = this.customerForm.value;
    customer.contactEmailAddresses = [{email:this.customerForm.value.contactEmailAddresses}] ;
    this.customerService.addCustomer(customer).subscribe(data => {
      alert("customer added");
    });
  }


}
