import {FormGroup} from "@angular/forms";

export abstract class CustomerAbstractForm implements EditAction {

  public form: FormGroup;

  abstract edit(formField: string): void;

}

export interface EditAction {
  edit(formField: string): void;
}
