import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {isDefined} from "@angular/compiler/src/util";
import {ShipService} from "../ship.service";

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

  constructor(private shipService: ShipService) {

  }

  ngOnInit() {
    this.isArrayForm = isDefined(this.arrayName);
  }

  addShip() {
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.push(this.shipService.initShip());
  }

  removeShip(index: number) {
    const control = <FormArray>this.formGroup.controls[this.arrayName];
    control.removeAt(index);
  }

}
