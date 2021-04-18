import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  private showRegistrationMessage: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate(['/customers']);
    }
    this.registrationForm = this.fb.group({
      username: [,Validators.required],
      email: [, Validators.required],
      phoneNumber: [, Validators.required],
      password: [, Validators.required],
      confirmPassword: [, Validators.required]
    }, { validators: this.checkPasswords });
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  registerUser() {
    if(this.registrationForm.invalid) {
      return;
    }
    this.userService.registerUser(this.registrationForm.value).subscribe(result => {
      this.showRegistrationMessage = true;
    });
  }
}
