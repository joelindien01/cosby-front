import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../customer/customer";
import {ContactEditForm} from "../../customer/view-customer/forms/contact-edit-form";
import {FormBuilder} from "@angular/forms";
import {CustomerService} from "../../customer/customer.service";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  @Input() public contact: Contact;
  @Input() public customerId: number;
  public contactEditForm: ContactEditForm;

  constructor(private fb :FormBuilder, private customerService: CustomerService, private contactService: ContactService) {

  }

  ngOnInit() {
    this.contactEditForm = new ContactEditForm(this.fb, this.customerService, this.contactService, this.customerId);
  }

}
