import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorStateMatcher,
  MatAutocomplete, MatAutocompleteModule, MatBadgeModule,
  MatButtonModule, MatCardModule, MatChipsModule, MatDateFormats, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatIconModule,
  MatInputModule,
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
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatCardModule,
    MatExpansionModule

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
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MaterialModule { }

