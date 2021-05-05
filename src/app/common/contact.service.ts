import {Injectable} from '@angular/core';
import {FormInitiator} from "./form-initiator";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailAddressService} from "./email-address.service";
import {Contact} from "../customer/customer";
import {isDefined} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class ContactService implements FormInitiator {

  initForm(contact?:any) {
    return this.fb.group({
      id: isDefined(contact) ? contact.id : null,
      name: [isDefined(contact) ? contact.name :"", Validators.required],
      phoneNumber: [isDefined(contact) ? contact.phoneNumber :"", Validators.required],
      email: [isDefined(contact) ? contact.email :"", [ Validators.email]],
      contactFunction: [isDefined(contact) ? contact.contactFunction :"", Validators.required]
    });
  }

  constructor(private fb: FormBuilder) { }
}
