import { Component, OnInit } from '@angular/core';
import {UserService} from "../../common/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.passwordResetForm = this.fb.group({password: ''});
  }

  ngOnInit() {

  }

  resetPassword() {
    this.userService.resetPassword(this.passwordResetForm.get("password").value);

  }
}
