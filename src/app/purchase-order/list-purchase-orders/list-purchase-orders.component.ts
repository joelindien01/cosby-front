import {Component, OnInit, ViewChild} from '@angular/core';
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-list-purchase-orders',
  templateUrl: './list-purchase-orders.component.html',
  styleUrls: ['./list-purchase-orders.component.scss']
})
export class ListPurchaseOrdersComponent implements OnInit {
  purchaseOrderList$;
  customerId: number;
  displayedColumns: string[] = ['Customer name', 'Order creation date', 'Delivery address', 'Action'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private orderService: PurchaseOrderService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        this.customerId = params['customerId'];
        this.purchaseOrderList$ = orderService.getOrderByCustomerId(this.customerId);
      }


    });
  }

  ngOnInit() {
    this.purchaseOrderList$.subscribe(purchaseOrderList =>  {
      this.dataSource = new MatTableDataSource<PurchaseOrder>(purchaseOrderList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createDeliveryNote(orderId: number, customerId: number) {
    this.router.navigate(['/delivery-notes/add', {customerId: customerId, orderId: orderId}]).then();
  }

  createBill(orderId: number, customerId: number) {
    this.router.navigate(['/bill/add', {customerId: customerId, orderId: orderId}]).then();
  }
}
