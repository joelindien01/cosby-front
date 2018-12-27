import {Component, Input, OnInit} from '@angular/core';
import {MultiAddableForm} from "../multi-addable-form";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends MultiAddableForm implements OnInit {

  constructor(private contactService: ContactService) {
    super(contactService);
  }

}
