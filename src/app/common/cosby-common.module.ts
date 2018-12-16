import {NgModule} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClientModule} from "@angular/common/http";
import {AddressComponent} from './address/address.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressService} from "./address.service";

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AddressComponent],
  providers: [ConfigService, AddressService]
})
export class CosbyCommonModule { }
