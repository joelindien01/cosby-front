import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Address} from "../customer/customer";
import {isDefined} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private fb: FormBuilder) { }

  initAddress(address?: Address) {
    // initialize our address
    return this.fb.group({
      id: isDefined(address) ? address.id : null,
      street: [isDefined(address) ? address.street : '', Validators.required],
      city: [isDefined(address) ? address.city : '', Validators.required],
      state: [isDefined(address) ? address.state : ''],
      zipCode: [isDefined(address) ? address.zipCode : '', Validators.required],
      country: [isDefined(address) ? address.country : '', Validators.required]

    });
  }

  isSameAddress(first: Address, second: Address) {
    return first.id == second.id &&
      first.city == second.city &&
      first.country == second.country &&
      first.state == second.state &&
      first.zipCode == second.zipCode &&
      first.street == second.street;
  }
}
