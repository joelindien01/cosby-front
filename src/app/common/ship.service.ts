import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private fb: FormBuilder) { }

  initShip() {
    // initialize our address
    return this.fb.group({
      vessel: [''],
      imo: [''],
      flag: [''],
      master: ['']
    });
  }
}
