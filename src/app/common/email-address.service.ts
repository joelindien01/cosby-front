import { Injectable } from '@angular/core';
import {FormInitiator} from "./form-initiator";
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EmailAddressService implements FormInitiator {
  initForm() {
    return this.fb.group({
      email: ""
    });
  }

  constructor(private fb: FormBuilder) { }
}
