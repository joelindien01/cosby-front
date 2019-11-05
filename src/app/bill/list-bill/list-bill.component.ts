import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/index";
import {Bill, BillDTO} from "../bill";
import {map} from "rxjs/internal/operators";
import {Customer} from "../../customer/customer";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {
  public billList$: Observable<Array<Bill>>;
  public customer$: Observable<Customer>;
  public billTable$: Observable<Array<BillTable>>;
  public customerId: number;
  billSearchForm: FormGroup;

  constructor(private billService: BillService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadBillsByCustomerId(customerId);

      } else {
        this.loadAllBills();
      }
    });
    this.mapBillTable();
  }

  ngOnInit() {
  }

  generateBill(billId: number) {
    this.billService.generateBill(billId);
  }

  sendBillByEmail(billId: number) {
    this.billService.sendBillByEmail(billId);
  }

  public loadBillsByCustomerId(customerId: number) {
    this.billList$ = this.billService.getBillsByCustomerId(customerId);
    this.customer$ = this.billList$.pipe(
      map(billList => billList[0].purchaseOrder.customer)
    );

  }

  public loadAllBills() {
    this.billList$ = this.billService.findAll();
  }

  public mapBillTable() {
    this.billTable$ = this.billList$.pipe(
      map(billList => {
        return billList.map( bill => {
          let billTable = new BillTable();
          billTable.billId = bill.id;
          billTable.deliveryNoteId = bill.deliveryNote.id;
          billTable.creationDate = bill.creationDate;
          billTable.deadLine = bill.deadLine;
          billTable.discount = bill.discount;
          billTable.purchaseOrderId = bill.deliveryNote.purchaseOrder.id;

          return billTable;
        })
      })
    )
  }

  viewBill(billId: number) {
    this.router.navigateByUrl("/bills/"+billId).then();
  }

  findBills() {

  }
}

export class BillTable {
  billId;
  purchaseOrderId;
  deliveryNoteId;
  deadLine;
  discount;
  creationDate;
}
