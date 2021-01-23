import {DeliveryNote, PurchaseOrder} from "../purchase-order/PurchaseOrder";

export class BillDTO {
  billId: number;
  deliveryNoteId: number;
  purchaseOrderId: number;
  deadLine: Date;
  discount: number;
  creationDate: Date;
  totalAmount: number;
  deliveryFee: number;
  transportationFee: number;
}

export class Bill {
  id: number;
  purchaseOrder: PurchaseOrder;
  deliveryNote: DeliveryNote;
  deadLine: Date;
  discount: number;
  creationDate: Date;
}

