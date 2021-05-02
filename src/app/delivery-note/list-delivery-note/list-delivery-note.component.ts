import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {Customer} from "../../customer/customer";
import {map} from "rxjs/internal/operators";
import {DeliveryNote} from "../../purchase-order/PurchaseOrder";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

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
  deliveryNotesTable$: Observable<Array<DeliveryNoteTable>>;
  public deliveryNotes: Array<DeliveryNote>;
  delNotesSearchForm: FormGroup;
  public paymentMethod: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];
  displayedColumns: string[] = ['note', 'po', 'deliveryDate','customerName','vessel', 'creationDate', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public delNoteMatTable: MatTableDataSource<DeliveryNoteTable> = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private router: Router,
              private fb: FormBuilder) {


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
            deliveryNoteTable.vessel = deliveryNote.purchaseOrder.deliveryInformation.vessel;
            deliveryNoteTable.customerName = deliveryNote.purchaseOrder.customer.name;
            deliveryNoteTable.creationDate = deliveryNote.creationDate;
            deliveryNoteTable.deliveryNoteId = deliveryNote.id;
            return deliveryNoteTable;
          })
        })
      );
    this.deliveryNotesTable$.subscribe(delNote => {
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
}
