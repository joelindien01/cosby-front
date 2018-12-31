import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PurchaseOrderService} from "./purchase-order.service";
import { ListPurchaseOrdersComponent } from './list-purchase-orders/list-purchase-orders.component';
import {MaterialModule} from "../common/material/material.module";

@NgModule({
  declarations: [AddPurchaseOrderComponent, ListPurchaseOrdersComponent],
  exports: [AddPurchaseOrderComponent],
  providers: [PurchaseOrderService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class PurchaseOrderModule { }
