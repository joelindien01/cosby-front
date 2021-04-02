import {ChangeDetectorRef, Input} from "@angular/core";
import {FormArray, FormControl, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {isDefined} from "@angular/compiler/src/util";
import {FormInitiator} from "./form-initiator";
import {ErrorStateMatcher} from "@angular/material";

export abstract class MultiAddableForm {
  @Input() groupName: string;
  @Input() arrayName: string;
  @Input() formGroup: FormGroup;
  isArrayForm: boolean;
  @Input() formTitle: string;
  protected formInitiator: FormInitiator;
  matcher;

  constructor(formInitiator: FormInitiator) {
    this.formInitiator = formInitiator;
    this.matcher = new MyErrorStateMatcher();
  }


  ngOnInit() {
    this.isArrayForm = isDefined(this.arrayName);
    console.log(this.isArrayForm);
  }

  protected add() {
    // add address to the list
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.push(this.formInitiator.initForm());
  }

  protected remove(i: number) {
    // remove address from the list
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.removeAt(i);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isTouched = form && form.touched;
    return isTouched ? (control && control.invalid) : false;
  }
}
