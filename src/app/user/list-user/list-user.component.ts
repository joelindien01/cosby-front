import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserService} from "../../common/user.service";
import {RegisterComponent} from "../register/register.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {AddProfileComponent} from "../add-profile/add-profile.component";
import {ViewRolesComponent} from "../view-roles/view-roles.component";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  userDataTable: MatTableDataSource<any>;
  displayedColumns: string[] = ["name", "email", "profile","roles", "phoneNumber", "active", "actions"];
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.userDataTable = new MatTableDataSource();
    this.loadUsers();
    this.userDataTable.sort = this.sort;
  }

  ngOnInit() {
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "50%",
      data: {}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadUsers();
    });
  }

  addProfile() {
    const dialogRef = this.dialog.open(AddProfileComponent, {
      width: "50%",
      data: {}
    });
    dialogRef.afterClosed().subscribe(value => {

    });
  }

  editUser(user) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "50%",
      data: {userData: user}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadUsers();
    });
  }

  private loadUsers() {
    this.userService.findAllUsers().subscribe(users => {
      this.userDataTable.data = users;
      this.userDataTable.paginator = this.paginator;
    })
  }

  viewRoles(user) {
    const dialogRef = this.dialog.open(ViewRolesComponent, {
      width: "50%",
      data: {user: user}
    });
  }
}
