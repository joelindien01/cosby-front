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
import {LoginComponent} from "./user/login/login.component";
import {UserModule} from "./user/user.module";
import {RegisterComponent} from "./user/register/register.component";
import {AuthGuardServiceService as AuthGuard} from "./common/auth-guard-service.service";
import {UserViewComponent} from "./user/user-view/user-view.component";
import {LoadProductComponent} from "./product/load-product/load-product.component";
import {UomModule} from "./uom/uom.module";
import {AccountModule} from "./account/account.module";
import {GroupComponent} from "./reference-data/group/group.component";
import {ReferenceDataModule} from "./reference-data/reference-data.module";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserViewComponent },
  { path: 'customers/add', component: AddCustomerComponent, canActivate: [AuthGuard]},
  { path: 'delivery-notes/add', component: AddDeliveryNoteComponent, canActivate: [AuthGuard] },
  { path: 'delivery-notes', component: ListDeliveryNoteComponent, canActivate: [AuthGuard] },
  { path: 'delivery-notes/:deliveryNoteId', component: ViewDeliveryNoteComponent , canActivate: [AuthGuard]},
  { path: 'customers', component: ListCustomerComponent , canActivate: [AuthGuard]},
  { path: 'customer', component: ViewCustomerComponent , canActivate: [AuthGuard]},
  { path: 'product', component: AddProductComponent , canActivate: [AuthGuard]},
  { path: 'products', component: ListProductComponent , canActivate: [AuthGuard]},
  { path: 'group', component: GroupComponent , canActivate: [AuthGuard]},
  { path: 'load-products', component: LoadProductComponent , canActivate: [AuthGuard]},
  { path: 'bills/add', component: AddBillComponent , canActivate: [AuthGuard]},
  { path: 'bills', component: ListBillComponent , canActivate: [AuthGuard]},
  { path: 'bills/:billId', component: ViewBillComponent , canActivate: [AuthGuard]},
  { path: 'purchase-order', component: AddPurchaseOrderComponent , canActivate: [AuthGuard]},
  { path: 'purchase-order/:orderId', component: ViewPurchaseOrderComponent , canActivate: [AuthGuard]},
  { path: 'purchase-orders', component: ListPurchaseOrdersComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: 'login',
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
    UserModule,
    UomModule,
    AccountModule,
    ReferenceDataModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
