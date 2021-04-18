import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.scss']
})
export class ViewRolesComponent implements OnInit {

  name: string;
  roles: Array<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any, profile: any}) {
    if(this.data !=undefined) {
      if(isDefined(this.data.user)) {
        this.name = this.data.user.username;
        this.roles = this.data.user.roles;

      } else if(isDefined(this.data.profile)) {
        this.name = this.data.profile.name;
        this.roles = this.data.profile.roles;
      }
    }
  }


  ngOnInit() {
  }



}
