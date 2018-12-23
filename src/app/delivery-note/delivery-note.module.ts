import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryNoteComponent } from './add-delivery-note/add-delivery-note.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AddDeliveryNoteComponent],
  exports: [AddDeliveryNoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class DeliveryNoteModule { }
