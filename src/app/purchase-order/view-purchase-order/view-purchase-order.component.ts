import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNote, DeliveryNoteDTO, Item, ItemDto, PurchaseOrder} from "../PurchaseOrder";
import {Observable} from "rxjs/Rx";
import {PurchaseOrderService} from "../purchase-order.service";
import {map, tap} from "rxjs/internal/operators";
import {BillDTO} from "../../bill/bill";
import {isDefined} from "@angular/compiler/src/util";
import {NgxSpinnerService} from "ngx-spinner";
import {concatMap} from "rxjs-compat/operator/concatMap";
import {forkJoin} from "rxjs/index";
import {BillService} from "../../bill/bill.service";
import {DeliveryNoteService} from "../../delivery-note/delivery-note.service";
import {CartService} from "../../cart/cart.service";
import {isUndefined} from "util";


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
  private show: boolean;
  private po: PurchaseOrder;
  private dn: any;
  private items: Array<any>;
  private sortedItems$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: PurchaseOrderService,
              private router: Router,
              private spinner: NgxSpinnerService, private billService: BillService, private deliveryNoteService: DeliveryNoteService,
              private cartService: CartService) {
    this.show = false;
    this.spinner.show();
    if(!this.purchaseOrder$) {
      this.activatedRoute.params.subscribe(params => {
        const purchaseOrderId = params['orderId'];
        if(purchaseOrderId) {
          this.loadPurchaseOrder(purchaseOrderId);
        }
      });
    } else{

      this.purchaseOrder$.shareReplay().subscribe(po => this.po = po);

    }
  }

  generateDeliveryNote(deliveryNoteId: number) {
    this.deliveryNoteService.generateDeliveryNote(deliveryNoteId);
  }

  createCreditNote(currentBillId: any) {
    this.billService.createCreditNote(currentBillId);
  }

  generateBill(billId: number) {
    this.billService.generateBill(billId);
  }

  ngOnInit() {
    if(isDefined(this.bill)){
      this.totalAmount = 0;
      this.netTotal = 0;
      setTimeout(() => {
        this.spinner.hide();
        this.show = true;
      }, 1000);
    } else if(isDefined(this.deliveryNote$)) {
      this.deliveryNote$.subscribe(res => {
        this.dn = res;
        setTimeout(() => {
          this.spinner.hide();
          this.show = true;
        }, 1000);
        this.purchaseOrder$ = this.orderService.findById(res.id).shareReplay();
        this.purchaseOrder$.subscribe(po => this.po = po);

      });

    }
  }

  sort(array:Array<any>){
    if(isUndefined(array) || array == null) {
      return;
    }
    return array.sort(this.compareItemPosition);
  }

  createBill(deliveryNoteId: number) {
    this.router.navigate(['/bills/add', {deliveryNoteId: deliveryNoteId}]).then();
  }

  private loadPurchaseOrder(purchaseOrderId: number) {
    this.purchaseOrder$ = this.orderService.findById(purchaseOrderId).shareReplay();
    this.items$ = this.orderService.findItemsByOrderId(purchaseOrderId).shareReplay();

    forkJoin([this.purchaseOrder$, this.items$]).subscribe(allResults => {
      this.spinner.hide();
      this.show = true;
      this.po = allResults[0];
      this.items = <Array<any>>allResults[1];
      console.log(allResults);
      this.items = this.items.map(item => {
        item.itemDTO.product = item.product;
        item.itemDTO.overridePrice = true;

        return item.itemDTO;
      });
      this.items.sort(this.comparePosition);
    });
  }

  comparePosition(a, b) {

    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  }

  compareItemPosition(a, b) {

    if (a.itemDTO.position < b.itemDTO.position)
      return -1;
    if (a.itemDTO.position > b.itemDTO.position)
      return 1;
    return 0;
  }

  createDeliveryNote() {
    this.purchaseOrder$.take(1).subscribe(order => {

      this.router.navigate(['/delivery-notes/add', {customerId: order.customer.id, orderId: order.id}]).then();
    });
  }

  editDeliveryNote() {
    this.deliveryNoteService.deliveryNote = this.dn;
    this.dn.purchaseOrder = this.po;
    this.router.navigate(['/delivery-notes/add', {customerId: this.dn.purchaseOrder.customer.id, orderId: this.dn.id}]).then();
  }

  editPO() {
    this.orderService.po = this.po;
    this.cartService.items = this.items;
    this.router.navigate(['/purchase-order',{customerId: this.po.customer.id, poId: this.po.id}]).then();
  }

  editBill() {
    this.billService.bill = this.bill;

    this.router.navigate(['/bills/add', {deliveryNoteId: this.bill.deliveryNoteId}]).then();
  }
}
