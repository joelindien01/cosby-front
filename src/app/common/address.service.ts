import { Injectable } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Address} from "../customer/customer";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private fb: FormBuilder) { }

  initAddress() {
    // initialize our address
    return this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: ['']

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
