import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalUomService} from "../global-uom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ReferenceDataDTO} from "../list-uom/list-uom.component";

@Component({
  selector: 'app-create-uom',
  templateUrl: './create-uom.component.html',
  styleUrls: ['./create-uom.component.scss']
})
export class CreateUomComponent implements OnInit {
  referenceDataFormGroup: FormGroup;
  types: string[];

  constructor(private fb: FormBuilder, private referenceDataService: GlobalUomService, public dialogRef: MatDialogRef<CreateUomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {refData: ReferenceDataDTO}) {
    this.types = ["UOM","CURRENCY"];
    this.referenceDataFormGroup = this.fb.group({
      id: [data !=undefined && data.refData != undefined ? data.refData.id : null],
      type: [data !=undefined && data.refData != undefined ? data.refData.type : "",Validators.required],
      label: [data !=undefined && data.refData != undefined ? this.data.refData.label: "",Validators.required],
      symbol: [data !=undefined && data.refData != undefined ? this.data.refData.symbol: "",Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    if(this.referenceDataFormGroup.invalid) {
      return;
    }
    this.referenceDataService.save(this.referenceDataFormGroup.value).subscribe(result => {
      alert("Reference Data Saved");
      this.dialogRef.close();
    });
  }

}
