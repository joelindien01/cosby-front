import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {
  MatAutocomplete, MatAutocompleteModule,
  MatButtonModule, MatChipsModule, MatDateFormats, MatDatepickerModule, MatIconModule, MatInputModule, MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatTableModule, NativeDateAdapter, MatPaginatorModule, MatCheckboxModule
} from "@angular/material";

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
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule
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
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule
  ]
})
export class MaterialModule { }

