import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PurchaseOrderService} from "../../purchase-order/purchase-order.service";
import {ShipService} from "../../common/ship.service";

@Component({
  selector: 'app-add-delivery-note',
  templateUrl: './add-delivery-note.component.html',
  styleUrls: ['./add-delivery-note.component.scss']
})
export class AddDeliveryNoteComponent implements OnInit {
  deliveryNoteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private orderService: PurchaseOrderService,
              private shipService: ShipService) {

    this.deliveryNoteForm = this.fb.group({
      deliveryDate: [],
      deliveryAddress: this.fb.array([this.shipService.initShip()])
    });
  }

  ngOnInit() {
  }

}
