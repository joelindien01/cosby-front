import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BillService} from "../bill.service";
import {Observable} from "rxjs/Rx";
import {Bill, BillDTO} from "../bill";
import {ItemDto, PurchaseOrder} from "../../purchase-order/PurchaseOrder";
import {PurchaseOrderService} from "../../purchase-order/purchase-order.service";

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  private bill$: Observable<BillDTO>;
  private purchaseOrder$: Observable<PurchaseOrder>;
  private items$: Observable<Array<ItemDto>>;
  private deliveryNoteId: number;

  constructor(private route: ActivatedRoute,
              private billService: BillService,
              private orderService: PurchaseOrderService) {
    this.route.params.subscribe(params => {
      if (params['billId']) {
        const billId = params['billId'];
        this.bill$ = this.billService.findBillById(billId);
        this.bill$.subscribe(bill => {
          this.deliveryNoteId = bill.deliveryNoteId;
          this.purchaseOrder$ = this.orderService.findById(bill.purchaseOrderId);
          this.purchaseOrder$.subscribe(order => {
            this.items$ = this.orderService.findItemsByOrderId(order.id);
          })
        });

      }
    });
  }

  ngOnInit() {
  }

}
