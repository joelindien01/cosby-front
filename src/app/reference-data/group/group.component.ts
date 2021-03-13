import { Component, OnInit, Input, Inject } from '@angular/core';

import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ReferenceDataService} from "../reference-data.service";

import { MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  showList: boolean;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public linkedProductGroupForm: FormGroup;
  @Input() showList: boolean;
  groupDataSource: MatTableDataSource<any> = new MatTableDataSource();



  constructor(private fb: FormBuilder, private referenceDataService: ReferenceDataService,
              private dialogRef: MatDialogRef<GroupComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {
    this.linkedProductGroupForm = this.fb.group({
      label: '',
      symbol: '',
      multiSelect: false
    });

  }

  public saveProductGroup() {
    console.log(this.linkedProductGroupForm.value);
    this.referenceDataService.saveProductGroup(this.linkedProductGroupForm.value)
      .subscribe(result=> {
        const data = this.groupDataSource.data;
        data.push(this.linkedProductGroupForm.value);
        this.groupDataSource.data = data;
        alert('Group added');
        this.dialogRef.close(true);
      }, error => {
        this.dialogRef.close(false);
      });
  }

  ngOnInit() {
    if(this.dialogData !== undefined) {
      this.showList = this.dialogData.showList;
    } else if (this.showList === undefined) {
      this.showList = true;
    }



  }

}
