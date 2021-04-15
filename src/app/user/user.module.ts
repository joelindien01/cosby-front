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
import {AccountModule} from "../account/account.module";
import {UomModule} from "../uom/uom.module";
import {CreateUomComponent} from "../uom/create-uom/create-uom.component";
import {AddAccountComponent} from "../account/add-account/add-account.component";
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserViewComponent, ListUserComponent, AddUserComponent, AddProfileComponent, ListProfileComponent],
  exports: [LoginComponent, RegisterComponent, UserViewComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CosbyCommonModule,
    RouterModule,
    AccountModule,
    UomModule
  ],
  entryComponents: [CreateUomComponent, AddAccountComponent, AddUserComponent, AddProfileComponent]
})
export class UserModule { }
