import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../common/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate(['/customers']);
    }
    this.loginForm = this.fb.group({username: '', password: ''});
  }

  ngOnInit() {
  }

  login() {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate(['/customers']);
    }
    const  username = this.loginForm.get("username").value;
    const  password = this.loginForm.get("password").value;
    this.userService.checkLogin(username, password);

  }
}
