import { Component, OnInit } from '@angular/core';
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-purchase-orders',
  templateUrl: './list-purchase-orders.component.html',
  styleUrls: ['./list-purchase-orders.component.scss']
})
export class ListPurchaseOrdersComponent implements OnInit {
  purchaseOrderList$;
  customerId: number;

  constructor(private orderService: PurchaseOrderService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        this.customerId = params['customerId'];
        this.purchaseOrderList$ = orderService.getOrderByCustomerId(this.customerId);
      }
    });
  }

  ngOnInit() {
  }

  createDeliveryNote() {

  }

  createBill(customerId: number, orderId: number) {
    this.router.navigate(['/bill/add', {customerId: customerId, orderId: orderId}]).then();
  }
}
