import {PurchaseOrder} from "../purchase-order/PurchaseOrder";

export class BillDTO {

  purchaseOrderId: number;
  deadLine: Date;
  discount: number;
}

export class Bill {
  id: number;
  purchaseOrder: PurchaseOrder;
  deadLine: Date;
  discount: number;
  creationDate: Date;
}
