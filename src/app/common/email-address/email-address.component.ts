import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MultiAddableForm} from "../multi-addable-form";
import {EmailAddressService} from "../email-address.service";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-email-address',
  templateUrl: './email-address.component.html',
  styleUrls: ['./email-address.component.scss']
})
export class EmailAddressComponent extends MultiAddableForm implements OnInit {

  constructor(private emailAddressService: EmailAddressService) {
    super(emailAddressService);
  }


  ngOnInit() {
    this.isArrayForm = isDefined(this.arrayName);
  }

}
