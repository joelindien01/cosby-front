import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddressEditForm} from "../../customer/view-customer/forms/address-edit-form";
import {CustomerService} from "../../customer/customer.service";
import {AddressService} from "../address.service";

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss']
})
export class ViewAddressComponent implements OnInit {

  @Input() title: string;
  @Input() address: Address;
  addressEditForm: AddressEditForm;

  constructor(private fb :FormBuilder, private customerService: CustomerService, private addressService: AddressService) { }

  ngOnInit() {
    this.addressEditForm = new AddressEditForm(this.fb, this.customerService, this.addressService, this.address);
  }

}
