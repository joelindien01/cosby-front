import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PurchaseOrderService} from "./purchase-order.service";
import { ListPurchaseOrdersComponent } from './list-purchase-orders/list-purchase-orders.component';
import {MaterialModule} from "../common/material/material.module";
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ViewPurchaseOrderComponent } from './view-purchase-order/view-purchase-order.component';

@NgModule({
  declarations: [AddPurchaseOrderComponent, ListPurchaseOrdersComponent, ViewPurchaseOrderComponent],
  exports: [AddPurchaseOrderComponent, ListPurchaseOrdersComponent, ViewPurchaseOrderComponent],
  providers: [PurchaseOrderService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule
  ]
})
export class PurchaseOrderModule { }
