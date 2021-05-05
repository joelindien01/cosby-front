import {Component, Inject, Input, OnInit} from '@angular/core';
import {ListCreditNoteComponent} from "../list-credit-note/list-credit-note.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Bill, BillDTO} from "../../bill/bill";
import {CreditNote, CreditNoteDocData, CreditNoteService} from "../credit-note.service";

@Component({
  selector: 'app-list-credit-note-dialog',
  templateUrl: './list-credit-note-dialog.component.html',
  styleUrls: ['./list-credit-note-dialog.component.scss']
})
export class ListCreditNoteDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ListCreditNoteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public bill: Bill, private creditNoteService: CreditNoteService) {

  }

  ngOnInit() {
  }
  generateCreditNote(note: CreditNote, bill: Bill) {
    let cn = new CreditNoteDocData();
    cn.id = note.id;
    cn.billId = this.bill.id;
    cn.vessel = this.bill.deliveryNote.purchaseOrder.deliveryInformation.vessel;
    cn.creditedAmount = note.creditedAmount;
    cn.creationDate = note.creationDate;
    cn.netToBeDeducted = note.netToBeDeducted;
    cn.bill = bill;
    this.creditNoteService.generateCreditNote(cn);

  }

}
