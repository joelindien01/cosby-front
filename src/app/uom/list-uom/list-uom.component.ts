import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {GlobalUomService} from "../global-uom.service";
import {CreateUomComponent} from "../create-uom/create-uom.component";

export class ReferenceDataDTO {
  id: number;
  type: string;
  label: string;
  symbol: string;

}

@Component({
  selector: 'app-list-uom',
  templateUrl: './list-uom.component.html',
  styleUrls: ['./list-uom.component.scss']
})
export class ListUomComponent implements OnInit {

  displayedColumns = ["type", "symbol", "label", "actions"];
  referenceDataTable: MatTableDataSource<ReferenceDataDTO>;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort)  sort: MatSort;

  constructor(private referenceDataService: GlobalUomService, private dialog: MatDialog) {
    this.referenceDataTable = new MatTableDataSource();
    this.loadUoms();
  }

  addReferenceData() {
    const dialogRef = this.dialog.open(CreateUomComponent, {
      width: "50%",
      data: {}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadUoms();
    });
  }

  ngOnInit() {
  }

  editRefData(refData) {
    const dialogRef = this.dialog.open(CreateUomComponent, {
      width: "50%",
      data: {refData: refData}
    });
    dialogRef.afterClosed().subscribe(value => {
      this.loadUoms();
    });
  }

  private loadUoms() {
    this.referenceDataService.findAll().subscribe(result => {
      this.referenceDataTable.data = result;
      this.referenceDataTable.paginator = this.paginator;
      this.referenceDataTable.sort = this.sort;
    });
  }
}
