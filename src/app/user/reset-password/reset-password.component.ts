import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../common/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetLoginForm: FormGroup;
  resetPasswordForm: FormGroup;
  showRestMessage: boolean = false;
  private showResetPasswordForm: boolean = false;
  private user: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.resetPasswordForm = this.fb.group({
      password: [, Validators.required],
      confirmPassword: [, Validators.required],
    });
    if(this.userService.isUserLoggedIn()) {
      this.router.navigate(['/customers']);
    }
    const url = this.router.url;
    let showResetPassForm;
    showResetPassForm = !url.startsWith("/validation");
    this.validateToken(showResetPassForm);
    this.resetLoginForm = this.fb.group({
      username: [, Validators.required],
      email: [, Validators.required],
    });
  }

  private validateToken(showResetPassForm) {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      if (isDefined(userId)) {
        this.userService.validateToken(userId, params['token']).subscribe(user => {
          this.showResetPasswordForm = showResetPassForm;
          this.user = user;
          if(!showResetPassForm) {
            this.router.navigate(['/login']);
          }

        });
      }
    });
  }

  ngOnInit() {
  }

  reset() {
    if(this.resetLoginForm.invalid) {
      return;
    }
    this.userService.resetPassword(this.resetLoginForm.value).subscribe(result => {
      this.showRestMessage = true;
    });
  }

  save() {
    let user: any = this.resetPasswordForm.value;
    if(this.resetPasswordForm.invalid || user.password != user.confirmPassword) {
      return;
    }
    this.user.password = user.password;
    this.userService.registerUser(this.user).subscribe(result => {
      this.userService.authenticate(this.user.username, user.password).subscribe( r => {
        this.router.navigate(['/customers']);
      });
    });
  }

}
