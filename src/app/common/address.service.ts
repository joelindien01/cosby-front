import { Injectable } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";

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
}
