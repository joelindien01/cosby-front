import {NgModule} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClientModule} from "@angular/common/http";
import {AddressComponent} from './address/address.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressService} from "./address.service";
import { ShipComponent } from './ship/ship.component';
import {ShipService} from "./ship.service";
import { ContactComponent } from './contact/contact.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import {EmailAddressService} from "./email-address.service";

@NgModule({
  declarations: [AddressComponent, ShipComponent, ContactComponent, EmailAddressComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AddressComponent, ShipComponent, ContactComponent],
  providers: [ConfigService, AddressService, ShipService, EmailAddressService]
})
export class CosbyCommonModule { }
