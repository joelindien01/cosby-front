import {Component, Input, OnInit} from '@angular/core';
import {MultiAddableForm} from "../multi-addable-form";
import {ContactService} from "../contact.service";
import {Contact} from "../../customer/customer";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends MultiAddableForm implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) {
    super(contactService);

  }

  ngOnInit() {
    if(this.contact != undefined) {
      this.formGroup.get(this.groupName).setValue(this.contact);
    }
    super.ngOnInit();
  }

}
