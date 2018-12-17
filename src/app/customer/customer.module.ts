import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add/add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerService} from "./customer.service";
import {HttpClientModule} from "@angular/common/http";
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ListCustomerComponent } from './list-customer/list-customer.component';

@NgModule({
  declarations: [AddCustomerComponent, ListCustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule
  ],
  exports: [AddCustomerComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
