import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CosbyCommonModule} from "../common/cosby-common.module";
import {ReferenceDataService} from "./reference-data.service";
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  declarations: [GroupComponent, GroupListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CosbyCommonModule
  ],
  exports: [GroupComponent, GroupListComponent],
  providers: [ReferenceDataService]
})
export class ReferenceDataModule { }
