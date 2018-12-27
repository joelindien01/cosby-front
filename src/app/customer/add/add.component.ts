import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressComponent} from "../../common/address/address.component";
import {AddressService} from "../../common/address.service";
import {CustomerService} from "../customer.service";
import {ShipService} from "../../common/ship.service";
import {ContactService} from "../../common/contact.service";
import {deepEqual} from "assert";
import {Address} from "../customer";


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
      useLocationAddress: [false],
      contacts: this.fb.array([this.contactService.initForm()]),
      billingAddress: this.addressService.initAddress(),
      location: this.addressService.initAddress(),
      deliveryInformations: this.fb.array([this.shipService.initShip()])
    });
    this.onUseLocationAddressChanges();
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

  private onUseLocationAddressChanges() {
    this.customerForm.get('useLocationAddress').valueChanges.subscribe(val=> {
      if(val == true) {
        this.syncLocationAddressWithBillingAddress();
      } else {
        this.unsyncLocationAddressWithBillingAddress();
      }
    });
  }

  private syncLocationAddressWithBillingAddress() {
    const location = this.customerForm.get('location');
    this.customerForm.controls['billingAddress'].patchValue(location.value);
  }

  private unsyncLocationAddressWithBillingAddress() {
    const location = this.customerForm.get('location');
    const billingAddress: Address = <Address>this.customerForm.controls['billingAddress'].value;
    if(this.addressService.isSameAddress(billingAddress, location.value)) {
      this.customerForm.controls['billingAddress'].reset();
    }
  }
}