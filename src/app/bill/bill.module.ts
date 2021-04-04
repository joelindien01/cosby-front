import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddBillComponent } from './add-bill/add-bill.component';
import { ListBillComponent } from './list-bill/list-bill.component';
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ViewBillComponent } from './view-bill/view-bill.component';
import {PurchaseOrderModule} from "../purchase-order/purchase-order.module";
import {DeliveryNoteModule} from "../delivery-note/delivery-note.module";
import {CreditNoteModule} from "../credit-note/credit-note.module";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [AddBillComponent, ListBillComponent, ViewBillComponent],
  exports: [AddBillComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CosbyCommonModule,
    PurchaseOrderModule,
    DeliveryNoteModule,
    CreditNoteModule,    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BillModule { }
