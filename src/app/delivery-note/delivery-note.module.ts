import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryNoteComponent } from './add-delivery-note/add-delivery-note.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ListDeliveryNoteComponent } from './list-delivery-note/list-delivery-note.component';
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ViewDeliveryNoteComponent } from './view-delivery-note/view-delivery-note.component';
import {ViewPurchaseOrderComponent} from "../purchase-order/view-purchase-order/view-purchase-order.component";
import {PurchaseOrderModule} from "../purchase-order/purchase-order.module";

@NgModule({
  declarations: [AddDeliveryNoteComponent, ListDeliveryNoteComponent, ViewDeliveryNoteComponent],
  exports: [AddDeliveryNoteComponent, ViewDeliveryNoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    PurchaseOrderModule
  ]
})
export class DeliveryNoteModule { }
