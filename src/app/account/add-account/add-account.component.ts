import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Account} from "../../bill/bill";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  accountFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              public dialogRef: MatDialogRef<AddAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {account: Account}) {
    this.accountFormGroup = this.fb.group({
      id: [data != undefined && data.account != null ? data.account.id : null],
      bankName: [data != undefined && data.account != null ? data.account.bankName : "", Validators.required],
      holder: [data != undefined && data.account != null ? data.account.holder: "", Validators.required],
      iban: [data != undefined && data.account != null ? data.account.iban : "",  Validators.required],
      reference: [data != undefined && data.account != null ? data.account.reference : "", Validators.required],
      rib: [data != undefined && data.account != null ? data.account.rib : "", Validators.required],
      swiftCode: [data != undefined && data.account != null ? data.account.swiftCode : "", Validators.required],
    });
  }

  ngOnInit() {
  }
  save() {
    if(this.accountFormGroup.invalid) {
      return;
    }
    this.accountService.save(this.accountFormGroup.value).subscribe(result => {
      alert("account saved");
      this.dialogRef.close();
    });
  }

}
