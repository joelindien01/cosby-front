import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./product.service";
import {CosbyCommonModule} from "../common/cosby-common.module";

@NgModule({
  declarations: [AddProductComponent],
  exports:[AddProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
