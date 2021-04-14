import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AccountService} from "../account.service";
import {Account} from "../../bill/bill";
import {AddAccountComponent} from "../add-account/add-account.component";

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  accountDataTable: MatTableDataSource<Account>;

  displayedColumns = ["bankName", "holder", "reference", "rib","iban","swiftCode", "actions"];
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;

  constructor(private accountService: AccountService, private dialog: MatDialog) {
    this.accountDataTable = new MatTableDataSource();
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.findAllAccounts().subscribe( accounts => {
      this.accountDataTable.data = accounts;
      this.accountDataTable.paginator = this.paginator;
      this.accountDataTable.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  editAccount(account) {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: "50%",
      data: {account: account}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadAccounts();
    });
  }

  addAccount() {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: "50%",
      data: {}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadAccounts();
    });
  }
}
