import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressComponent} from "../../common/address/address.component";
import {AddressService} from "../../common/address.service";
import {CustomerService} from "../customer.service";
import {ShipService} from "../../common/ship.service";
import {ContactService} from "../../common/contact.service";
import {deepEqual} from "assert";
import {Address, Customer} from "../customer";
import {Router} from "@angular/router";
import {isDefined} from "@angular/compiler/src/util";


@Component({
  selector: 'app-customer-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.customerService.customer = undefined;
  }


  public customerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private customerService: CustomerService,
              private shipService: ShipService,
              private contactService: ContactService,
              private router: Router) {
    const customer: Customer = this.customerService.customer;
    this.customerForm = this.fb.group({
      name: ['',Validators.required],
      description: [''],
      useLocationAddress: [false],
      contacts: this.fb.array([this.contactService.initForm()]),
      billingAddress: this.addressService.initAddress(),
      location: this.addressService.initAddress(),
      addAnotherCustomer: [true]
    });
    if(isDefined(customer)) {
      this.customerForm = this.fb.group({
        id: isDefined(customer) ? customer.id : null,
        name: [isDefined(customer)?customer.name: '',Validators.required],
        description: [isDefined(customer) ? customer.description : ''],
        useLocationAddress: [false],
        contacts: this.fb.array([]),
        billingAddress: this.addressService.initAddress(customer.billingAddress),
        location: this.addressService.initAddress(customer.location),
        addAnotherCustomer: [true]
      });
      customer.contacts.forEach(contact => {
        (this.customerForm.get('contacts') as FormArray).push(this.contactService.initForm(contact));
      })
    }
  }



  ngOnInit() {
    this.onUseLocationAddressChanges();
  }

  saveCustomer() {
    if (this.customerForm.invalid) {
      this.customerForm.markAsTouched({ onlySelf: true });
      this.customerForm.updateValueAndValidity({ onlySelf: true, emitEvent: true }
    );
      return;
    }
    let customer = this.customerForm.value;
    customer.contactEmailAddresses = [{email:this.customerForm.value.contactEmailAddresses}] ;
    const addAnotherCustomer = customer.addAnotherCustomer;
    this.customerService.addCustomer(customer).subscribe(addedCustomer => {
      alert("customer added");
      if(addAnotherCustomer) {
        this.customerForm.reset();
      } else {
        this.router.navigate(['/customer', {customerId: addedCustomer.id}]).then();
      }
    },
      error2 => {
      if(error2.error.exception == "org.springframework.dao.DataIntegrityViolationException") {
        alert("Can't delete a Customer who is already linked to a PO/Bill, Please refresh !!");
      }
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
