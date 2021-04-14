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
  MatSelectModule, MatSlideToggleModule, MatSortModule,
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
    MatExpansionModule,
    MatSlideToggleModule

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
    MatExpansionModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MaterialModule { }

