import {Injectable} from '@angular/core';
import {FormInitiator} from "./form-initiator";
import {FormBuilder} from "@angular/forms";
import {EmailAddressService} from "./email-address.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService implements FormInitiator {
  initForm() {
    return this.fb.group({
      name: "",
      phoneNumber: "",
      email: ""
    });
  }

  constructor(private fb: FormBuilder) { }
}
