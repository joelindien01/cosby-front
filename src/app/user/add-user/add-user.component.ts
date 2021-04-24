import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {isUndefined} from "util";
import {isDefined} from "@angular/compiler/src/util";
import {Profile, Role} from "../user-view/user-view.component";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  availableRoles: Array<any>;
  addUserForm: FormGroup;
  availableProfiles: Array<any>;

  constructor(private fb: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: {userData: any, selfAccountEdit: boolean}) {
    this.userService.findAllRoles().subscribe(roles => this.availableRoles = roles);
    this.userService.findAllProfiles().subscribe(profiles => this.availableProfiles = profiles);
    const user = this.data.userData;
    this.addUserForm = this.fb.group({
      id: [isUndefined(user) ? null :this.data.userData.id],
      username: [isUndefined(user) ? null :this.data.userData.username, Validators.required],
      email: [isUndefined(user) ? null :this.data.userData.email, Validators.required],
      phoneNumber: [isUndefined(user) ? null :this.data.userData.phoneNumber, Validators.required],
      active: [isUndefined(user) ? null :this.data.userData.active],
      roles: [isUndefined(user) ? null :this.data.userData.roles],
      profile: [isUndefined(user) ? null :this.data.userData.profile, Validators.required],
      password: [""],
      confirmPassword: [""],
    });

  }

  ngOnInit() {

  }

  addUser() {

    if(!this.formIsValid()) {
      return;
    }
    let editedUser = this.addUserForm.value;
    editedUser.selfAccountEdit = this.data.selfAccountEdit;
    this.userService.backOfficeRegistration(editedUser).subscribe(result => {
      alert("User added");
      this.dialogRef.close(editedUser);
    });
  }

  compareId(o1: any, o2: any) {
    return (isDefined(o1) && isDefined(o2) && o1.id ==o2.id);
  }

  private formIsValid() {
    let form: any = {...this.addUserForm.value};
    const passwordAreSame = form.password == form.confirmPassword;
    if(this.data.selfAccountEdit) {
      delete form.roles;
      delete form.profile;
      delete form.active;
    }
      delete form.password;
      delete form.confirmPassword;

    return passwordAreSame && Object.keys(form).findIndex(key => isUndefined(form[key])) == -1;
  }
}

export interface UserAddForm {
  id: number;
  username: string;
  email: string;
  phoneNumber: number;
  active: boolean;
  roles: Array<any>;
  profile: Profile;
  password: string;
  confirmPassword: string;
  selfAccountEdit: boolean;
}
