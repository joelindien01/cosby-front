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
import { LoadProductComponent } from './load-product/load-product.component';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [AddProductComponent, ListProductComponent, ViewProductComponent, LoadProductComponent],
  exports:[AddProductComponent, LoadProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    RouterModule,
    AngularFileUploaderModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
