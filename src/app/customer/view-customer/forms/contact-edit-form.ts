import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../customer.service";
import {ContactService} from "../../../common/contact.service";
import {CustomerAbstractForm} from "./customer-abstract-form";
import {Observable} from "rxjs/Rx";

export class ContactEditForm extends CustomerAbstractForm {


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private contactService: ContactService,
              private customerId: number) {
    super();
    this.form = this.fb.group({
      contacts: this.contactService.initForm()

    });
  }

  edit(formFieldName: string): Observable<any> {
    return this.customerService.editContact(this.customerId, [this.form.get(formFieldName).value]);
  }

}
