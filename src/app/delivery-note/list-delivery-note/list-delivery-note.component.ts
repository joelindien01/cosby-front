import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";
import {ActivatedRoute} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {Customer} from "../../customer/customer";
import {map} from "rxjs/internal/operators";
import {DeliveryNote} from "../../purchase-order/PurchaseOrder";

@Component({
  selector: 'app-list-delivery-note',
  templateUrl: './list-delivery-note.component.html',
  styleUrls: ['./list-delivery-note.component.scss']
})
export class ListDeliveryNoteComponent implements OnInit {
  deliveryNotes$: Observable<Array<DeliveryNote>>;
  private customer$: Observable<Customer>;

  constructor(private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService) {


    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.deliveryNotes$ = deliveryNoteService.getDeliveryNotesByCustomerId(customerId);
      }
    });

    this.customer$ = this.deliveryNotes$
      .pipe(
      map(deliveryNoteList => {
        if (deliveryNoteList && deliveryNoteList.length > 0) {
          return deliveryNoteList[0].purchaseOrder.customer;
        }
      })
    );
  }

  ngOnInit() {
  }

  generateDeliveryNote(deliveryNote: DeliveryNote) {
    this.deliveryNoteService.generateDeliveryNote(deliveryNote.id).subscribe(result => {
      alert("note generated");
    });
  }

  sendBillByEmail(deliveryNote: DeliveryNote) {
    this.deliveryNoteService.sendDeliveryNoteByEmail(deliveryNote.id)
  }

}
