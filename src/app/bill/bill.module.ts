import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddBillComponent } from './add-bill/add-bill.component';
import { ListBillComponent } from './list-bill/list-bill.component';

@NgModule({
  declarations: [AddBillComponent, ListBillComponent],
  exports: [AddBillComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BillModule { }
