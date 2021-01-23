import {Component, OnInit} from '@angular/core';
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryInformation} from "../../customer/customer";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/internal/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReferenceItem} from "../add-purchase-order/add-purchase-order.component";

@Component({
  selector: 'app-list-purchase-orders',
  templateUrl: './list-purchase-orders.component.html',
  styleUrls: ['./list-purchase-orders.component.scss']
})
export class ListPurchaseOrdersComponent implements OnInit {
  purchaseOrderList$: Observable<Array<PurchaseOrder>>;
  ordersTableData$: Observable<Array<OrderTable>>;
  purchaseOrderList: Array<PurchaseOrder>;
  orderSearchForm: FormGroup;
  public paymentMeans: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];



  constructor(private orderService: PurchaseOrderService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.params.subscribe(params => {
      if (params['customerId']) {
        const customerId = params['customerId'];
        this.loadOrdersByCustomerId(customerId);
      } else {
        this.loadAllOrders();
      }
      this.mapOrdersTable();
    });
    this.orderSearchForm = this.fb.group({
      customerNameCSV: '',
      poCreatedAfter: [],
      poCreatedBefore: [],
      paymentStatus: [],
      paymentMeans: [],
      purchaseOrderIdCSV: ''
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
            orderTable.paymentStatus = purchaseOrder.paymentInformation.paymentStatus;
            return orderTable;
          });
        })
      );
  }

  viewOrder(orderId: number) {
    this.router.navigateByUrl('/purchase-order/'+ orderId).then();
  }

  findOrders() {
    var searchForm = this.orderSearchForm.getRawValue();
    this.purchaseOrderList$ = this.orderService.findOrders(searchForm);
    this.mapOrdersTable();

    this.orderService.findOrders(searchForm).subscribe(s => {
      console.log(s);
    })

  }
}

export class OrderTable {
  id: number;
  customerId: number;
  orderCreationDate: Date;
  customerName: string;
  deliveryInformation: DeliveryInformation;
  paymentStatus: string;
}
