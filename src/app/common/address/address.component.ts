import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {AddressService} from "../address.service";
import {isDefined} from "@angular/compiler/src/util";
import {Address} from "../../customer/customer";
import {MyErrorStateMatcher} from "../multi-addable-form";

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

  matcher;


  constructor(private addressService: AddressService) {
    this.matcher = new MyErrorStateMatcher();

  }



  ngOnInit() {
    if(this.address != undefined) {
      this.formGroup.get(this.groupName).setValue(this.address);
    }
    this.isArrayForm = isDefined(this.arrayName);
    console.log(this.isArrayForm);
    this.onChanges();
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

  private onChanges() {
    this.formGroup.valueChanges.subscribe(val => {

      let elements:FormGroup = <FormGroup>this.formGroup.controls[this.groupName];
      Object.keys(elements.controls).forEach(key => {
        elements.controls[key].markAsTouched();
      }) ;
      /*elements.controls.forEach(el =>{
        let elt = <FormGroup> el;
        Object.keys(elt.controls).forEach(key => {
          elt.controls[key].markAsTouched();
        }) ;
        el.setErrors(elt.errors);
        //elt.controls.
      });*/
      // /this.formGroup.controls[this.arrayName].markAsTouched({onlySelf: true})
    });
  }
}
