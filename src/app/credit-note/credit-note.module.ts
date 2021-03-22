import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCreditNoteComponent } from './add-credit-note/add-credit-note.component';
import {CosbyCommonModule} from "../common/cosby-common.module";
import {CreditNoteService} from "./credit-note.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ListCreditNoteComponent } from './list-credit-note/list-credit-note.component';
import {MatDialogRef} from "@angular/material";
import { ListCreditNoteDialogComponent } from './list-credit-note-dialog/list-credit-note-dialog.component';

@NgModule({
  declarations: [AddCreditNoteComponent, ListCreditNoteComponent, ListCreditNoteDialogComponent],
  exports: [AddCreditNoteComponent, ListCreditNoteComponent, ListCreditNoteDialogComponent],
  providers: [CreditNoteService],
  imports: [
    CommonModule,
    CosbyCommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddCreditNoteComponent, ListCreditNoteComponent, ListCreditNoteDialogComponent
  ]
})
export class CreditNoteModule { }
