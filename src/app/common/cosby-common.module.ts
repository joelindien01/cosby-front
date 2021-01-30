import {NgModule} from '@angular/core';
import {ConfigService} from "./config.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AddressComponent} from './address/address.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressService} from "./address.service";
import { ShipComponent } from './ship/ship.component';
import {ShipService} from "./ship.service";
import { ContactComponent } from './contact/contact.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import {EmailAddressService} from "./email-address.service";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MaterialModule} from './material/material.module';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {ShContextMenuModule} from "ng2-right-click-menu";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import { ViewAddressComponent } from './view-address/view-address.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ViewShipComponent } from './view-ship/view-ship.component';
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faDownload, faEye, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {DocGeneratorService} from "./doc-generator.service";
import { ModalComponent } from './modal/modal.component';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {UserService} from "./user.service";
import {BasicAuthHttpInterceptorService} from "./basic-auth-http-interceptor.service";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {MatDateFormats, NativeDateAdapter} from "@angular/material";

@NgModule({
  declarations: [AddressComponent, ShipComponent, ContactComponent, EmailAddressComponent, ViewAddressComponent, ViewContactComponent, ViewShipComponent, ModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    Ng2SmartTableModule,
    MaterialModule,
    ShContextMenuModule,
  ],
  exports: [AddressComponent, ShipComponent, ContactComponent, FontAwesomeModule, Ng2SmartTableModule, MaterialModule, ShContextMenuModule, ViewAddressComponent, ViewContactComponent, ViewShipComponent, ModalComponent],
  providers: [ConfigService, AddressService, ShipService, EmailAddressService, DocGeneratorService, {provide:HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi:true}]
})
export class CosbyCommonModule {

  constructor() {
    library.add(faPlus);
    library.add(faMinus);
    library.add(faEdit);
    library.add(faPen);
    library.add(faEye);
    library.add(faSearch);
    library.add(faPowerOff);
    library.add(faDownload);

  }
}

