import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../common/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({username: '', password: ''});
  }

  ngOnInit() {
  }

  registerUser() {
    const  username = this.registrationForm.get("username").value;
    const  password = this.registrationForm.get("password").value;
    this.userService.registerUser(username, password);
  }
}
