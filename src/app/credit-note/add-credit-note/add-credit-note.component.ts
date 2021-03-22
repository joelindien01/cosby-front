import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CreditNoteService} from "../credit-note.service";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface CreditNoteDialogData {
  billId: number;
}
@Component({
  selector: 'app-add-credit-note',
  templateUrl: './add-credit-note.component.html',
  styleUrls: ['./add-credit-note.component.scss']
})
export class AddCreditNoteComponent implements OnInit {

  creditNoteFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCreditNoteComponent>,
  @Inject(MAT_DIALOG_DATA) public creditNoteDialogData: CreditNoteDialogData,
  private creditNoteService: CreditNoteService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.creditNoteFormGroup = this.fb.group({
      creditedAmount: 1,
      netToBeDeducted: 0
    });
  }

  saveCreditNote() {
    let creditNote = this.creditNoteFormGroup.value;
    creditNote.bill = {id: this.creditNoteDialogData.billId};
    this.creditNoteService.saveCreditNote(creditNote).subscribe(result => {
      alert("credit note saved");
    });
    this.dialogRef.close();
  }
}
