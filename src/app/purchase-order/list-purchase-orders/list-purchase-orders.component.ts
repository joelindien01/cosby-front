import {Component, OnInit} from '@angular/core';
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryInformation} from "../../customer/customer";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-list-purchase-orders',
  templateUrl: './list-purchase-orders.component.html',
  styleUrls: ['./list-purchase-orders.component.scss']
})
export class ListPurchaseOrdersComponent implements OnInit {
  purchaseOrderList$: Observable<Array<PurchaseOrder>>;
  ordersTableData$: Observable<Array<OrderTable>>;
  purchaseOrderList: Array<PurchaseOrder>;


  constructor(private orderService: PurchaseOrderService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadOrdersByCustomerId(customerId);
      } else {
        this.loadAllOrders();
      }
      this.mapOrdersTable();
    });
  }

  ngOnInit() {
    this.purchaseOrderList$.subscribe(purchaseOrderList =>  {
      this.purchaseOrderList = purchaseOrderList;
    });
  }

  createDeliveryNote(orderId: number, customerId: number) {
    this.router.navigate(['/delivery-notes/add', {customerId: customerId, orderId: orderId}]).then();
  }

  createBill(orderId: number, customerId: number) {
    this.router.navigate(['/bills/add', {customerId: customerId, orderId: orderId}]).then();
  }

  private loadOrdersByCustomerId(customerId: number) {
    this.purchaseOrderList$ = this.orderService.getOrderByCustomerId(customerId);

  }

  private loadAllOrders() {
    this.purchaseOrderList$ = this.orderService.findAll();
  }

  private mapOrdersTable() {
    this.ordersTableData$ = this.purchaseOrderList$
      .pipe(
        map( purchaseOrderList => {
          return purchaseOrderList.map(purchaseOrder => {
            let orderTable = new OrderTable();
            orderTable.id = purchaseOrder.id;
            orderTable.customerName = purchaseOrder.customer.name;
            orderTable.orderCreationDate = purchaseOrder.creationDate;
            orderTable.deliveryInformation = purchaseOrder.deliveryInformation;
            orderTable.customerId = purchaseOrder.customer.id;
            return orderTable;
          });
        })
      );
  }

  viewOrder(orderId: number) {
    this.router.navigateByUrl('/purchase-order/'+ orderId).then();
  }
}

export class OrderTable {
  id: number;
  customerId: number;
  orderCreationDate: Date;
  customerName: string;
  deliveryInformation: DeliveryInformation;
}
