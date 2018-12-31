import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {DeliveryNoteDTO} from "../../purchase-order/PurchaseOrder";

@Component({
  selector: 'app-add-delivery-note',
  templateUrl: './add-delivery-note.component.html',
  styleUrls: ['./add-delivery-note.component.scss']
})
export class AddDeliveryNoteComponent implements OnInit {
  deliveryNoteForm: FormGroup;
  private orderId: number;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService) {

    this.deliveryNoteForm = this.fb.group({
      deliveryDate: []
    });


    this.route.params.subscribe(params => {
      if (params['orderId']) {
        this.orderId = params['orderId']
      }
    });

  }

  ngOnInit() {
  }

  saveDeliveryNote() {
    let deliveryNoteDTO: DeliveryNoteDTO = this.deliveryNoteForm.value;
    deliveryNoteDTO.purchaseOrderId = this.orderId;
    this.deliveryNoteService.saveDeliveryNote(deliveryNoteDTO).subscribe(result =>{
      alert("delivery note saved");
    });
  }
}
