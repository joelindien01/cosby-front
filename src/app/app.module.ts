import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CosbyMaterialModule} from "./cosby-material/cosby-material.module";
import {RouterModule, Routes} from "@angular/router";
import {CustomerModule} from "./customer/customer.module";
import {AddCustomerComponent} from "./customer/add/add.component";
import {ProductModule} from "./product/product.module";
import {AddProductComponent} from "./product/add-product/add-product.component";

const appRoutes: Routes = [
  { path: 'customer', component: AddCustomerComponent },
  { path: 'product', component: AddProductComponent },
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
    CosbyMaterialModule,
    CustomerModule,
    ProductModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
