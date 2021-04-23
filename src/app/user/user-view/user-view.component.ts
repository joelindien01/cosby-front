import { Component, OnInit } from '@angular/core';
import {UserService} from "../../common/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {AddUserComponent} from "../add-user/add-user.component";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private userService: UserService, private dialog: MatDialog) {
    this.userForm = this.fb.group({password: ''});
  }

  ngOnInit() {
    this.user = this.userService.getConnectedUser();

  }

  editUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "50%",
      data: {userData: this.user, selfAccountEdit: true}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.user =this.userService.reloadCurrentUser(value);
    });

  }

}

export class User {
  active: boolean;
  email: string;
  id: number;
  phoneNumber: number;
  profile: Profile;
  roles: Array<Role>;
  username: string;
}

export class Profile {
  id;
  description;
  name;
}

export class Role {
  id;
  description;
  name;

}
