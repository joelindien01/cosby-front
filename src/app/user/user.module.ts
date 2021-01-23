import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import {CosbyCommonModule} from "../common/cosby-common.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../common/user.service";
import { RegisterComponent } from './register/register.component';
import { UserViewComponent } from './user-view/user-view.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserViewComponent],
  exports: [LoginComponent, RegisterComponent, UserViewComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    RouterModule
  ]
})
export class UserModule { }
