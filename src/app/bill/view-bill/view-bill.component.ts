import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BillService} from "../bill.service";
import {Observable} from "rxjs/Rx";
import {Bill, BillDTO} from "../bill";
import {ItemDto, PurchaseOrder} from "../../purchase-order/PurchaseOrder";
import {PurchaseOrderService} from "../../purchase-order/purchase-order.service";
import {NgxSpinner} from "ngx-spinner/lib/ngx-spinner.enum";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  public bill$: Observable<BillDTO>;
  public purchaseOrder$: Observable<PurchaseOrder>;
  public items$: Observable<Array<ItemDto>>;
  public deliveryNoteId: number;
  private show: boolean;

  constructor(private route: ActivatedRoute,
              private billService: BillService,
              private orderService: PurchaseOrderService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.show = false;
    this.route.params.subscribe(params => {
      if (params['billId']) {
        const billId = params['billId'];
        this.bill$ = this.billService.findBillById(billId).shareReplay();
        this.bill$.subscribe(bill => {
          this.deliveryNoteId = bill.deliveryNoteId;
          /*this.purchaseOrder$ = this.orderService.findById(bill.purchaseOrderId).shareReplay();
          this.purchaseOrder$.subscribe(order => {
            this.items$ = this.orderService.findItemsByOrderId(order.id);
          })*/
          setTimeout(() => {
            this.show = true;
            this.spinner.hide();
          }, 1000);
        });

      }
    });
  }

  ngOnInit() {
  }

}
