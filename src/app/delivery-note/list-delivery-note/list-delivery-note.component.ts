import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";
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
  deliveryNotesTable$: Observable<Array<DeliveryNoteTable>>;
  private deliveryNotes: Array<DeliveryNote>;

  constructor(private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private router: Router) {


    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadNotesByCustomerId(customerId);
      } else {
        this.loadAllNotes();
      }
      this.mapDeliveryNoteTable();
    });

  }

  private loadNotesByCustomerId(customerId: number) {
    this.deliveryNotes$ = this.deliveryNoteService.getDeliveryNotesByCustomerId(customerId);
    this.customer$ = this.deliveryNotes$.pipe(
      map(deliveryNoteList => deliveryNoteList[0].purchaseOrder.customer)
    );
  }

  ngOnInit() {
    this.deliveryNotes$.subscribe(deliveryNotes => this.deliveryNotes = deliveryNotes);
  }

  generateDeliveryNote(deliveryNoteId: number) {
    this.deliveryNoteService.generateDeliveryNote(deliveryNoteId).subscribe(result => {
      alert("note generated");
    });
  }

  sendBillByEmail(deliveryNoteId: number) {
    this.deliveryNoteService.sendDeliveryNoteByEmail(deliveryNoteId)
  }

  private loadAllNotes() {
    this.deliveryNotes$ = this.deliveryNoteService.findAll();
  }

  createBill(deliveryNoteId: number) {
    this.router.navigate(['/bills/add', {deliveryNoteId: deliveryNoteId}]).then();
  }

  private mapDeliveryNoteTable() {
    this.deliveryNotesTable$ = this.deliveryNotes$
      .pipe(
        map(deliveryNoteList => {
          return deliveryNoteList.map( deliveryNote => {
            let deliveryNoteTable = new DeliveryNoteTable();
            deliveryNoteTable.purchaseOrderId = deliveryNote.purchaseOrder.id;
            deliveryNoteTable.deliveryDate = deliveryNote.deliveryDate;
            deliveryNoteTable.creationDate = deliveryNote.creationDate;
            deliveryNoteTable.deliveryNoteId = deliveryNote.id;
            return deliveryNoteTable;
          })
        })
      );
  }

  viewDeliveryNote(deliveryNoteId: number) {
    this.router.navigateByUrl("/delivery-notes/"+deliveryNoteId).then();
  }
}

export class DeliveryNoteTable {
  deliveryNoteId;
  purchaseOrderId;
  deliveryDate;
  creationDate;
}
