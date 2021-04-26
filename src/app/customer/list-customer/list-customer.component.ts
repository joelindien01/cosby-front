import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {Router} from "@angular/router";
import {Observable} from 'rxjs';
import {map} from "rxjs/internal/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: Observable<Array<Customer>>;
  customerTableData$: Observable<Array<CustomerTable>>;
  customerList: Array<Customer>;
  customerSearchForm: FormGroup;
  customerMatTable: MatTableDataSource<CustomerTable> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['customerName', 'customerDescription','locationCountry', 'actions'];


  constructor(private customerService: CustomerService, private router: Router, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              public cartService: CartService) {
    this.customerList$ = this.customerService.getCustomers().shareReplay();
    this.customerTableData$ = this.customerList$.pipe(
      map(customerList => customerList.map(customer => new CustomerTable(customer.id, customer.name, customer.description, customer.location.country)))
    ).shareReplay();
    this.customerList$.subscribe(customerList => this.customerList = customerList);
    this.customerSearchForm = this.fb.group({customerNameCSV: ''});

    this.customerTableData$.subscribe(customer => {
      this.customerMatTable.data = customer;
      this.customerMatTable.paginator = this.paginator;
      this.customerMatTable.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  createPurchaseOrder(customerId: number) {
    this.router.navigate(['/purchase-order', {customerId: customerId}]).then();
  }

  goToPurchaseOrdersPage(customerId: number) {
    this.router.navigate(['/purchase-orders', {customerId: customerId}]).then();
  }

  goToBillsPage(customerId: number) {
    this.router.navigate(['/bills', {customerId: customerId}]).then();
  }

  goToDeliveryNotePage(customerId: number) {
    this.router.navigate(['/delivery-notes', {customerId: customerId}]).then();
  }

  goToCustomerViewInfo(customerId: number) {
    this.router.navigate(['/customer', {customerId: customerId}]).then();
  }

  findCustomer() {
    let customerNameCSV: string  = this.customerSearchForm.value.customerNameCSV;
    let customerNameList: Array<string> = customerNameCSV != undefined && customerNameCSV.trim().length > 0 ? customerNameCSV.split(';') : [];
    this.customerList$ = this.customerService.findCustomer(customerNameList).shareReplay();
    this.customerTableData$ = this.customerList$.pipe(
      map(customerList => customerList.map(customer => new CustomerTable(customer.id, customer.name,customer.description, customer.location.country)))
    ).shareReplay();
    this.customerList$.subscribe(customerList => this.customerList = customerList);

    this.customerTableData$.subscribe(customer => {
      this.customerMatTable.data = customer;
      this.customerMatTable.paginator = this.paginator;
      this.customerMatTable.sort = this.sort;
    });
  }

  executeUpdate(customerList$) {

  }
}

export class CustomerTable {
  id;
  name;
  description;
  locationCountry;

  constructor(id, name, desc, locationCountry) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.locationCountry = locationCountry;
  }
}
