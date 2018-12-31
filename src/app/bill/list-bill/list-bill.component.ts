import { Component, OnInit } from '@angular/core';
import {BillService} from "../bill.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";
import {Bill} from "../bill";
import {map} from "rxjs/internal/operators";
import {Customer} from "../../customer/customer";

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {
  private billList$: Observable<Array<Bill>>;
  private customer$: Observable<Customer>;

  constructor(private billService: BillService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.billList$ = billService.getBillsByCustomerId(customerId);
      }
    });
    this.customer$ = this.billList$.pipe(
      map(billList => {
        if (billList && billList.length > 0) {
          return billList[0].purchaseOrder.customer;
        }
      })
    )
  }

  ngOnInit() {
  }

  generateBill(bill: Bill) {
    this.billService.generateBill(bill.id).subscribe(result => {
      alert("bill generated");
    });
  }

  sendBillByEmail(bill: Bill) {
    this.billService.sendBillByEmail(bill.id)
  }
}
