import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {AddressService} from "../address.service";
import {isDefined} from "@angular/compiler/src/util";
import {Address} from "../../customer/customer";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {


  @Output() changed = new EventEmitter<FormGroup>();
  @Input() groupName: string;
  @Input() arrayName: string;
  @Input() address: Address;
  @Input() formGroup: FormGroup;
  public isArrayForm: boolean;
  @Input() formTitle: string;


  constructor(private addressService: AddressService) {

  }



  ngOnInit() {
    this.isArrayForm = isDefined(this.arrayName);
    console.log(this.isArrayForm);
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.push(this.addressService.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.removeAt(i);
  }

}
