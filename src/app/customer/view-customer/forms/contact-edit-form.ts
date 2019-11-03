import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../customer.service";
import {ContactService} from "../../../common/contact.service";
import {CustomerAbstractForm} from "./customer-abstract-form";

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

  edit(formFieldName: string): void {
    this.customerService.editContact(this.customerId, [this.form.get(formFieldName).value]).subscribe();
  }

}
