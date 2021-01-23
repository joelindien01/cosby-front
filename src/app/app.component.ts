import { Component } from '@angular/core';
import {UserService} from "./common/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cosby-front';


  constructor(public userService: UserService) {

  }

  logout() {
    this.userService.logOut();
  }
}
