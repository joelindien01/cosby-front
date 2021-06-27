import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {Customer} from "../../customer/customer";
import {map} from "rxjs/internal/operators";
import {DeliveryNote} from "../../purchase-order/PurchaseOrder";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {isDefined} from "@angular/compiler/src/util";
import {StatusComponent} from "../../common/status/status.component";
import {StatusService} from "../../common/status.service";
import {ObjectStatus} from "../../purchase-order/list-purchase-orders/list-purchase-orders.component";

class ReferenceItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-list-delivery-note',
  templateUrl: './list-delivery-note.component.html',
  styleUrls: ['./list-delivery-note.component.scss']
})
export class ListDeliveryNoteComponent implements OnInit {
  deliveryNotes$: Observable<Array<DeliveryNote>>;
  public customer$: Observable<Customer>;
  public status: Array<ReferenceItem> = [{label:"Live", value: "LIVE"},{label:"Cancel", value:"CANCEL"}];
  deliveryNotesTable$: Observable<Array<DeliveryNoteTable>>;
  public deliveryNotes: Array<DeliveryNote>;
  delNotesSearchForm: FormGroup;
  public paymentMethod: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];
  displayedColumns: string[] = ['note', 'po', 'deliveryDate','customerName','vessel', 'status','creationDate','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public delNoteMatTable: MatTableDataSource<DeliveryNoteTable> = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private router: Router,
              private fb: FormBuilder,
              public dialog: MatDialog, private statusService: StatusService) {


    this.delNoteMatTable.paginator = this.paginator;
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadNotesByCustomerId(customerId);
      } else {
        this.loadAllNotes();
      }
      this.mapDeliveryNoteTable();
    });

    this.delNotesSearchForm = this.fb.group(
      {
        customerNameCSV: '',
        paymentStatus: [],
        paymentMeans: [],
        poStatus: '',
        dnStatus: '',
        purchaseOrderIdCSV: '',
        noteIdCSV: '',
        toBeDeliveredBefore: [],
        toBeDeliveredAfter: [],
        poCreatedBefore: [],
        poCreatedAfter: [],
        noteCreatedAfter: [],
        noteCreatedBefore: []
      });

  }

  editDeliveryNote(dn) {
    this.deliveryNoteService.deliveryNote = dn;
    this.router.navigate(['/delivery-notes/add', {customerId: dn.purchaseOrder.customer.id, orderId: dn.id}]).then();
  }

  cancelDelNote(deliveryNote) {
    const dialogRef = this.dialog.open(StatusComponent, {
      width: '500px',
      data: {id: deliveryNote.status.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(isDefined(result)) {
        deliveryNote.status.status = 'CANCEL';
      }
    });
  }

  restore(dn) {
    this.statusService.restore(dn.status).subscribe(result => {
      alert("DN restored");
    });
  }

  markAsDelivered(dn) {
    this.updateDelivery(dn, "DELIVERED", "Order Delivered");
  }

  markAsNotDelivered(dn) {
    this.updateDelivery(dn, "LIVE", "Restored to Live");
  }

  private updateDelivery(dn, status, alertMsg) {
    dn.status.status = status;
    dn.status.description = "";
    this.statusService.updateStatus(dn.status).subscribe(result => {
      alert(alertMsg);
    });
  }

  private loadNotesByCustomerId(customerId: number) {
    this.deliveryNotes$ = this.deliveryNoteService.getDeliveryNotesByCustomerId(customerId).shareReplay();
    this.customer$ = this.deliveryNotes$.pipe(
      map(deliveryNoteList => deliveryNoteList[0].purchaseOrder.customer)
    );
  }

  ngOnInit() {
    this.deliveryNotes$.subscribe(deliveryNotes => this.deliveryNotes = deliveryNotes);
  }

  generateDeliveryNote(deliveryNoteId: number) {
    this.deliveryNoteService.generateDeliveryNote(deliveryNoteId);
  }

  sendBillByEmail(deliveryNoteId: number) {
    this.deliveryNoteService.sendDeliveryNoteByEmail(deliveryNoteId)
  }

  private loadAllNotes() {
    this.deliveryNotes$ = this.deliveryNoteService.findAll().shareReplay();
  }

  createBill(deliveryNoteId: number) {
    this.router.navigate(['/bills/add', {deliveryNoteId: deliveryNoteId}]).then();
  }

  private mapDeliveryNoteTable() {
    this.deliveryNotesTable$ = this.deliveryNotes$
      .pipe(
        map(deliveryNoteList => {
          return deliveryNoteList.map( deliveryNote => {
            let deliveryNoteTable = new DeliveryNoteTable();
            deliveryNoteTable.purchaseOrderId = deliveryNote.purchaseOrder.id;
            deliveryNoteTable.deliveryDate = deliveryNote.deliveryDate;
            deliveryNoteTable.status = deliveryNote.status;
            deliveryNoteTable.vessel = deliveryNote.purchaseOrder.deliveryInformation.vessel;
            deliveryNoteTable.customerName = deliveryNote.purchaseOrder.customer.name;
            deliveryNoteTable.creationDate = deliveryNote.creationDate;
            deliveryNoteTable.deliveryNoteId = deliveryNote.id;
            deliveryNoteTable.dn = deliveryNote;

            return deliveryNoteTable;
          })
        })
      );
    this.deliveryNotesTable$.subscribe(delNote => {
    delNote.sort((a, b) =>{
        return (a.creationDate < b.creationDate ? -1 : 1) * -1;
      });
      this.delNoteMatTable.data = delNote;
      this.delNoteMatTable.paginator = this.paginator;
      this.delNoteMatTable.sort = this.sort;
    });
  }

  viewDeliveryNote(deliveryNoteId: number) {
    this.router.navigateByUrl("/delivery-notes/"+deliveryNoteId).then();
  }

  findNotes() {
    let searchForm = this.delNotesSearchForm.getRawValue();
    this.deliveryNotes$ = this.deliveryNoteService.findNotes(searchForm).shareReplay();
    this.mapDeliveryNoteTable();
/*    this.deliveryNoteService.findNotes(searchForm).subscribe(s => {
      console.log(s);
    })*/
  }
}

export class DeliveryNoteTable {
  deliveryNoteId;
  purchaseOrderId;
  deliveryDate;
  creationDate;
  customerName;
  vessel;
  status: ObjectStatus;
  dn: DeliveryNote;
}
