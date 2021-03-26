import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/index";
import {Bill, BillDTO} from "../bill";
import {map} from "rxjs/internal/operators";
import {Customer} from "../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReferenceItem} from "../../purchase-order/add-purchase-order/add-purchase-order.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddCreditNoteComponent} from "../../credit-note/add-credit-note/add-credit-note.component";
import {ListCreditNoteComponent} from "../../credit-note/list-credit-note/list-credit-note.component";
import {ListCreditNoteDialogComponent} from "../../credit-note/list-credit-note-dialog/list-credit-note-dialog.component";

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
  public paymentMethod: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];


  constructor(private billService: BillService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadBillsByCustomerId(customerId);

      } else {
        this.loadAllBills();
      }
    });
    this.mapBillTable();

    this.billSearchForm = this.fb.group(
      {
        customerNameCSV: '',
        paymentStatus: [],
        paymentMeans: [],
        purchaseOrderIdCSV: '',
        noteIdCSV: '',
        toBeDeliveredBefore: [],
        toBeDeliveredAfter: [],
        poCreatedBefore: [],
        poCreatedAfter: [],
        noteCreatedAfter: [],
        noteCreatedBefore: [],
        billCreatedAfter: [],
        billCreatedBefore: [],
        deadlineAfter: [],
        deadlineBefore: [],
        discount: '',
        billId: ''
      });
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
          billTable.initialBill = bill;

          return billTable;
        })
      })
    )
  }

  viewBill(billId: number) {
    this.router.navigateByUrl("/bills/"+billId).then();
  }

  findBills() {
    var searchForm = this.billSearchForm.getRawValue();
    this.billList$ = this.billService.findbills(searchForm);
    this.mapBillTable();
    /*this.billService.findbills(searchForm).subscribe(s => {
      console.log(s);
    })*/
  }

  createCreditNote(currentBillId: any) {
    const dialogRef = this.dialog.open(AddCreditNoteComponent, {
      width: '250px',
      data: {billId: currentBillId}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('Th');
    });
  }

  viewCreditNotes(bill: BillTable) {
    const dialogRef = this.dialog.open(ListCreditNoteDialogComponent, {
      width: '50%',
      data: bill.initialBill
    });
  }
}

export class BillTable {
  billId;
  purchaseOrderId;
  deliveryNoteId;
  deadLine;
  discount;
  creationDate;
  initialBill: any;
}
