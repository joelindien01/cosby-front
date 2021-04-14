import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {GlobalUomService} from "./global-uom.service";
import { CreateUomComponent } from './create-uom/create-uom.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CosbyCommonModule} from "../common/cosby-common.module";
import { ListUomComponent } from './list-uom/list-uom.component';

@NgModule({
  declarations: [CreateUomComponent, ListUomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CosbyCommonModule,
    HttpClientModule,
  ],
  exports: [CreateUomComponent, ListUomComponent],
  providers: [GlobalUomService]
})
export class UomModule { }
