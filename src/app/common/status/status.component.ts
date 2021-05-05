import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatusService} from "../status.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  statusForm: FormGroup;

  constructor(private fb: FormBuilder, private statusService: StatusService,public dialogRef: MatDialogRef<StatusComponent>,
              @Inject(MAT_DIALOG_DATA) public statusDialogData: {id: number}) {
    this.statusForm = this.fb.group({id:[statusDialogData.id], description: ["", Validators.required], status: "CANCEL"})
  }

  ngOnInit() {
  }

  updateStatus() {
    if(this.statusForm.invalid) {
      return;
    }
    this.statusService.updateStatus(this.statusForm.value).subscribe(result => {
      alert("status updated");
      this.dialogRef.close(this.statusDialogData.id);
    });
  }
}
