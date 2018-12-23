import {Input} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {isDefined} from "@angular/compiler/src/util";
import {FormInitiator} from "./form-initiator";

export abstract class MultiAddableForm {
  @Input() groupName: string;
  @Input() arrayName: string;
  @Input() formGroup: FormGroup;
  isArrayForm: boolean;
  @Input() formTitle: string;
  protected formInitiator: FormInitiator;

  constructor(formInitiator: FormInitiator) {
    this.formInitiator = formInitiator;
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
