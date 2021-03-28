import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorStateMatcher,
  MatAutocomplete, MatAutocompleteModule,
  MatButtonModule, MatChipsModule, MatDateFormats, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinner, MatProgressSpinnerModule,
  MatSelectModule, MatSortModule,
  MatStepperModule,
  MatTableModule, NativeDateAdapter, ShowOnDirtyErrorStateMatcher
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
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule

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
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MaterialModule { }

