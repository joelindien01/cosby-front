import {Component, OnInit, Input, Inject, Injector} from '@angular/core';
import {BillDTO} from "../../bill/bill";
import {CreditNote, CreditNoteDocData, CreditNoteService} from "../credit-note.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeliveryNote, PurchaseOrder} from "../../purchase-order/PurchaseOrder";

@Component({
  selector: 'app-list-credit-note',
  templateUrl: './list-credit-note.component.html',
  styleUrls: ['./list-credit-note.component.scss']
})
export class ListCreditNoteComponent implements OnInit {
  @Input() bill: any;
  @Input() vessel: string;

  constructor(private creditNoteService: CreditNoteService) {
  }

  ngOnInit() {
  }

  generateCreditNote(note: CreditNote) {
    let cn = new CreditNoteDocData();
    cn.id = note.id;
    cn.billId = this.bill.id;
    cn.vessel = this.vessel;
    cn.creditedAmount = note.creditedAmount;
    cn.creationDate = note.creationDate;
    cn.netToBeDeducted = note.netToBeDeducted;
    this.creditNoteService.generateCreditNote(cn);
  }
}
