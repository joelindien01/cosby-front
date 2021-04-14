import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MultiAddableForm} from "../multi-addable-form";
import {ContactService} from "../contact.service";
import {Contact} from "../../customer/customer";
import {AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends MultiAddableForm implements OnInit {
  @Input() public contact: Contact;

  constructor(private contactService: ContactService) {
    super(contactService);


  }

  ngOnInit() {
    if(this.contact != undefined) {
      this.formGroup.get(this.groupName).setValue(this.contact);
    }
    super.ngOnInit();
    this.onChanges();
  }

  onChanges(): void {
    if(this.arrayName != undefined) {
      this.formGroup.valueChanges.subscribe(val => {

        let elements:FormArray = <FormArray>this.formGroup.controls[this.arrayName];

        elements.controls.forEach(el =>{
          let elt = <FormGroup> el;
          Object.keys(elt.controls).forEach(key => {
            elt.controls[key].markAsTouched();
          }) ;
          el.setErrors(elt.errors);
          //elt.controls.
        });
        // /this.formGroup.controls[this.arrayName].markAsTouched({onlySelf: true})
      });
    } else {

    }
  }

}
