import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {CustomerModule} from "./customer/customer.module";
import {AddCustomerComponent} from "./customer/add/add.component";
import {ProductModule} from "./product/product.module";
import {AddProductComponent} from "./product/add-product/add-product.component";
import {AddPurchaseOrderComponent} from './purchase-order/add-purchase-order/add-purchase-order.component';
import {PurchaseOrderModule} from "./purchase-order/purchase-order.module";
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";
import {AddBillComponent} from "./bill/add-bill/add-bill.component";
import {BillModule} from "./bill/bill.module";
import {ListPurchaseOrdersComponent} from "./purchase-order/list-purchase-orders/list-purchase-orders.component";
import {DeliveryNoteModule} from "./delivery-note/delivery-note.module";
import {ListBillComponent} from "./bill/list-bill/list-bill.component";
import {AddDeliveryNoteComponent} from "./delivery-note/add-delivery-note/add-delivery-note.component";
import {ListDeliveryNoteComponent} from "./delivery-note/list-delivery-note/list-delivery-note.component";
import {MaterialModule} from "./common/material/material.module";

const appRoutes: Routes = [
  { path: 'customers/add', component: AddCustomerComponent },
  { path: 'delivery-notes/add', component: AddDeliveryNoteComponent },
  { path: 'delivery-notes', component: ListDeliveryNoteComponent },
  { path: 'customers', component: ListCustomerComponent },
  { path: 'product', component: AddProductComponent },
  { path: 'bills/add', component: AddBillComponent },
  { path: 'bills', component: ListBillComponent },
  { path: 'purchase-order/:customerId', component: AddPurchaseOrderComponent },
  { path: 'purchase-orders', component: ListPurchaseOrdersComponent },
  { path: '',
    redirectTo: '/customer',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CustomerModule,
    ProductModule,
    PurchaseOrderModule,
    BillModule,
    DeliveryNoteModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
