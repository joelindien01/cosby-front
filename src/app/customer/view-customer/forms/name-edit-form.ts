
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../customer.service";
import {CustomerAbstractForm} from "./customer-abstract-form";

export class NameEditForm extends CustomerAbstractForm {

  constructor(private fb: FormBuilder, private customerService: CustomerService, private customerId: number) {
    super();

    this.form = this.fb.group({
      name: ['',Validators.required],
      /*useLocationAddress: [false],
      contacts: this.fb.array([this.contactService.initForm()]),
      billingAddress: this.addressService.initAddress(),
      location: this.addressService.initAddress(),
      deliveryInformations: this.fb.array([this.shipService.initShip()]),
      addAnotherCustomer: [true]*/
    });
  }

  edit(formFieldName: string): void {
    this.customerService.editName(this.customerId, this.form.get(formFieldName).value).subscribe();
  }

}


