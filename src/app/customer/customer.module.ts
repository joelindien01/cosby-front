import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add/add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerService} from "./customer.service";
import {HttpClientModule} from "@angular/common/http";
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {MaterialModule} from '../common/material/material.module';
import {RouterModule} from '@angular/router';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {MAT_DIALOG_DATA} from "@angular/material";

@NgModule({
  declarations: [AddCustomerComponent, ListCustomerComponent, ViewCustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    MaterialModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [AddCustomerComponent, ListCustomerComponent],
  providers: [CustomerService, { provide: MAT_DIALOG_DATA, useValue: [] }]
})
export class CustomerModule { }
