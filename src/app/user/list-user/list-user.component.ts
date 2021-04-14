import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserService} from "../../common/user.service";
import {RegisterComponent} from "../register/register.component";
import {AddUserComponent} from "../add-user/add-user.component";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  userDataTable: MatTableDataSource<any>;
  displayedColumns: string[] = ["name", "email", "roles", "creationDate", "active", "actions"];
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.userDataTable = new MatTableDataSource();
    this.userService.findAllUsers().subscribe(users => {
      this.userDataTable.data = users;
      this.userDataTable.paginator = this.paginator;
      this.userDataTable.sort = this.sort;
    })
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

  }
}
