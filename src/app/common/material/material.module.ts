import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocomplete, MatAutocompleteModule,
  MatButtonModule, MatChipsModule, MatDateFormats, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatTableModule, NativeDateAdapter
} from "@angular/material";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    DragDropModule,
    MatDialogModule
  ],
  exports: [
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    DragDropModule,
    MatDialogModule
  ]
})
export class MaterialModule { }

