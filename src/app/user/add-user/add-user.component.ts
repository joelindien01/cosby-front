import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  availableRoles: Array<any>;
  addUserForm: FormGroup;
  availableProfiles: Array<any>;
  profileBasedPermissions: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: {userData: any}) {
    this.addUserForm = this.fb.group({
      username: [, Validators.required],
      email: [, Validators.required],
      phoneNumber: [, Validators.required],
      profileBasedPermissions: [true],
      active: [],
      roles: [],
      profile: [],
    });
    this.addUserForm.get("profileBasedPermissions").valueChanges.subscribe(value => {
      this.profileBasedPermissions = !this.profileBasedPermissions;
    });
  }

  ngOnInit() {
  }

  addUser() {
    if(this.addUserForm.invalid) {
      return;
    }
    this.userService.addUser(this.addUserForm.value).subscribe(result => {
      alert("User added");
      this.dialogRef.close();
    });
  }

}
