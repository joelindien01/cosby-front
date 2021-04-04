import {Injectable} from '@angular/core';
import {FormInitiator} from "./form-initiator";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailAddressService} from "./email-address.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService implements FormInitiator {
  initForm() {
    return this.fb.group({
      id: "",
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contactFunction: ["", Validators.required]
    });
  }

  constructor(private fb: FormBuilder) { }
}
