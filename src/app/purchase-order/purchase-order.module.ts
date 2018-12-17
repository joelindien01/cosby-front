import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';

@NgModule({
  declarations: [AddPurchaseOrderComponent],
  exports: [AddPurchaseOrderComponent],
  imports: [
    CommonModule
  ]
})
export class PurchaseOrderModule { }
