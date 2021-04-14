import {FormGroup} from "@angular/forms";

export abstract class CustomerAbstractForm implements EditAction {

  public form: FormGroup;

  abstract edit(formField: string);

}

export interface EditAction {
  edit(formField: string): void;
}
