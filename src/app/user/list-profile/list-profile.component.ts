import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserService} from "../../common/user.service";
import {AddProfileComponent} from "../add-profile/add-profile.component";

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  profileDataTable: MatTableDataSource<any>;
  displayedColumns = ["name", "description", "roles", "actions"];
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.profileDataTable = new MatTableDataSource();
    this.profileDataTable.sort = this.sort;
    this.profileDataTable.paginator = this.paginator;
    this.loadProfiles();
  }

  ngOnInit() {
  }

  editProfile(profile?) {
    let config = new MatDialogConfig();
    config.data = {profile: profile};
    config.width = "50%";
    const dialogRef = this.dialog.open(AddProfileComponent, config);
    dialogRef.afterClosed().subscribe(value => {
      this.loadProfiles();
    });
  }

  private loadProfiles() {
    this.userService.findAllProfiles().subscribe(profiles => {
      this.profileDataTable.data = profiles;

      this.profileDataTable.paginator = this.paginator;
    });
  }

  addProfile() {
    this.editProfile();
  }
}
