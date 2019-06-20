import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./product.service";
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ListProductComponent } from './list-product/list-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AddProductComponent, ListProductComponent, ViewProductComponent],
  exports:[AddProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    RouterModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
