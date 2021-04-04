import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCartComponent } from './view-cart/view-cart.component';
import {CartService} from "./cart.service";
import {CosbyCommonModule} from "../common/cosby-common.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../common/material/material.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {CustomerModule} from "../customer/customer.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ViewCartComponent],
  providers: [CartService],
  imports: [
    CommonModule,
    CosbyCommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule,
    CustomerModule,
    RouterModule
  ],
  exports: [ViewCartComponent]
})
export class CartModule { }
