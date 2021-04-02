import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private fb: FormBuilder) { }

  initShip() {
    // initialize our address
    return this.fb.group({
      vessel: ['', Validators.required],
      imo: ['', Validators.required],
      flag: ['', Validators.required],
      master: ['', Validators.required],
      port: ['', Validators.required]
    });
  }
}
