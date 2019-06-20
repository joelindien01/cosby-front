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
import { HomePageComponent } from './home-page/home-page.component';
import {ListProductComponent} from "./product/list-product/list-product.component";
import {ViewCustomerComponent} from "./customer/view-customer/view-customer.component";
import {ViewPurchaseOrderComponent} from "./purchase-order/view-purchase-order/view-purchase-order.component";
import {ViewDeliveryNoteComponent} from "./delivery-note/view-delivery-note/view-delivery-note.component";
import {ViewBillComponent} from "./bill/view-bill/view-bill.component";
import {FileSaverModule} from "ngx-filesaver";

const appRoutes: Routes = [
  { path: 'customers/add', component: AddCustomerComponent },
  { path: 'delivery-notes/add', component: AddDeliveryNoteComponent },
  { path: 'delivery-notes', component: ListDeliveryNoteComponent },
  { path: 'delivery-notes/:deliveryNoteId', component: ViewDeliveryNoteComponent },
  { path: 'customers', component: ListCustomerComponent },
  { path: 'customer', component: ViewCustomerComponent },
  { path: 'product', component: AddProductComponent },
  { path: 'products', component: ListProductComponent },
  { path: 'bills/add', component: AddBillComponent },
  { path: 'bills', component: ListBillComponent },
  { path: 'bills/:billId', component: ViewBillComponent },
  { path: 'purchase-order', component: AddPurchaseOrderComponent },
  { path: 'purchase-order/:orderId', component: ViewPurchaseOrderComponent },
  { path: 'purchase-orders', component: ListPurchaseOrdersComponent },
  { path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
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
    FileSaverModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
