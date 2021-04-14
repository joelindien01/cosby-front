import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../customer.service";
import {ContactService} from "../../../common/contact.service";
import {CustomerAbstractForm} from "./customer-abstract-form";
import {AddressService} from "../../../common/address.service";
import {Address} from "../../customer";

export class AddressEditForm extends CustomerAbstractForm {


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private addressService: AddressService,
              private address: Address, private customerId: number) {
    super();
    this.form = this.fb.group({
      address: this.addressService.initAddress()

    });
  }

  edit(formFieldName: string) {
    return this.customerService.editAddress(this.customerId, [this.form.get(formFieldName).value]);
  }

}
