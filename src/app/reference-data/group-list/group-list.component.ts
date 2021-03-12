import { Component, OnInit, ViewChild, Input } from '@angular/core';

import {ReferenceDataService} from "../reference-data.service";

import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import {LinkedProductGroup} from "../../uom/UnitOfMeasurement";
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  @Input() groupDataSource: MatTableDataSource<any> ;
  groups$: Observable<Array<LinkedProductGroup>>;

  displayedColumns: string[] = ['name', 'description', 'multiSelect', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.groupDataSource.paginator = this.paginator;
    this.groupDataSource.sort = this.sort;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.groupDataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.groupDataSource.data = this.groupDataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

  constructor(private referenceDataService: ReferenceDataService) {

    this.groups$ = this.referenceDataService.findAllGroup();
    this.groups$.subscribe(data => {
        this.groupDataSource.data = data;
      }
    );
  }

  ngOnInit() {
    if(this.groupDataSource === undefined) {
      this.groupDataSource = new MatTableDataSource();
    }
  }

}
