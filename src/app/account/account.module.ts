import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountService} from "./account.service";
import { AddAccountComponent } from './add-account/add-account.component';
import { ListAccountComponent } from './list-account/list-account.component';
import {CosbyCommonModule} from "../common/cosby-common.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddAccountComponent, ListAccountComponent],
  exports: [AddAccountComponent, ListAccountComponent],
  imports: [
    CommonModule,
    CosbyCommonModule,
    ReactiveFormsModule
  ],
  providers: [AccountService]
})
export class AccountModule { }
