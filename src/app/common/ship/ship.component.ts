import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {isDefined} from "@angular/compiler/src/util";
import {ShipService} from "../ship.service";
import {MyErrorStateMatcher} from "../multi-addable-form";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {

  @Output() changed = new EventEmitter<FormGroup>();
  @Input() groupName: string;
  @Input() arrayName: string;
  @Input() formGroup: FormGroup;
  isArrayForm: boolean;
  @Input() formTitle: string;
  matcher;

  constructor(private shipService: ShipService) {

  }

  ngOnInit() {
    this.isArrayForm = isDefined(this.arrayName);
    this.onChanges();
    this.matcher = new MyErrorStateMatcher();
  }

  addShip() {
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.push(this.shipService.initShip());
  }

  removeShip(index: number) {
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.removeAt(index);
  }

  onChanges(): void {
    if(this.arrayName) {
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
    } else if (this.groupName) {

    }

  }
}
