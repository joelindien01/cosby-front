import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item, ItemDto, PurchaseOrder} from "../PurchaseOrder";
import {Observable} from "rxjs/Rx";
import {PurchaseOrderService} from "../purchase-order.service";
import {map} from "rxjs/internal/operators";
import {BillDTO} from "../../bill/bill";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.scss']
})
export class ViewPurchaseOrderComponent implements OnInit {
  @Input() public purchaseOrder$: Observable<PurchaseOrder>;
  @Input() public title: string;
  @Input() public items$: Observable<Array<ItemDto>>;
  @Input() public deliveryNote$: Observable<any>;
  @Input() bill: BillDTO;
  totalAmount: number;
  netTotal: number;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: PurchaseOrderService,
              private router: Router) {
    if(!this.purchaseOrder$) {
      this.activatedRoute.params.subscribe(params => {
        const purchaseOrderId = params['orderId'];
        if(purchaseOrderId) {
          this.loadPurchaseOrder(purchaseOrderId);
        }
      });
    }
  }

  ngOnInit() {
    if(isDefined(this.bill)){
      this.totalAmount = 0;
      this.netTotal = 0;
    }
  }

  createBill(deliveryNoteId: number) {
    this.router.navigate(['/bills/add', {deliveryNoteId: deliveryNoteId}]).then();
  }

  private loadPurchaseOrder(purchaseOrderId: number) {
    this.purchaseOrder$ = this.orderService.findById(purchaseOrderId).shareReplay();
    this.items$ = this.orderService.findItemsByOrderId(purchaseOrderId).shareReplay();
  }

  createDeliveryNote() {
    this.purchaseOrder$.take(1).subscribe(order => {

      this.router.navigate(['/delivery-notes/add', {customerId: order.customer.id, orderId: order.id}]).then();
    });
  }
}
