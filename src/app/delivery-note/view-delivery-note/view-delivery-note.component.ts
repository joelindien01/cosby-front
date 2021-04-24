import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PurchaseOrderService} from "../../purchase-order/purchase-order.service";
import { DeliveryNoteService} from "../delivery-note.service";
import {Observable} from "rxjs/Rx";
import {DeliveryNoteDTO, ItemDto, PurchaseOrder} from "../../purchase-order/PurchaseOrder";
import {BillDTO} from "../../bill/bill";

@Component({
  selector: 'app-view-delivery-note',
  templateUrl: './view-delivery-note.component.html',
  styleUrls: ['./view-delivery-note.component.scss']
})
export class ViewDeliveryNoteComponent implements OnInit {
  public deliveryNote$: Observable<DeliveryNoteDTO>;
  public purchaseOrder$: Observable<PurchaseOrder>;
  public items$: Observable<Array<ItemDto>>;
  @Input() deliveryNoteId;
  @Input() bill: BillDTO;

  constructor(private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private orderService: PurchaseOrderService) {

  }

  loadData(deliveryNoteId) {
    this.deliveryNote$ = this.deliveryNoteService.findById(deliveryNoteId).shareReplay();
    this.deliveryNote$.subscribe(deliveryNote => {
      this.purchaseOrder$ = this.orderService.findById(deliveryNote.purchaseOrderId).shareReplay();
      this.purchaseOrder$.subscribe(order => {
        this.items$ = this.orderService.findItemsByOrderId(order.id);
      })
    });
}

  ngOnInit() {
    if(this.deliveryNoteId) {
      this.loadData(this.deliveryNoteId);
    } else {
      this.route.params.subscribe(params => {
        if (params['deliveryNoteId']) {
          const deliveryNoteId = params['deliveryNoteId'];
          this.loadData(deliveryNoteId);
        }
      });
    }

  }



}
