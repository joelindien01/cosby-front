import {DeliveryNote, PurchaseOrder} from "../purchase-order/PurchaseOrder";
import {Contact} from "../customer/customer";

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
  impactedAccount: Account;
  ourSignatory: string;
  ourSignatoryFunction: string;
  customerSignatory: string;
  customerSignatoryFunction: string;
  creditNotes: CreditNoteReadDTO[];
  emitter: any;
}

export class CreditNoteReadDTO
{

  id: number;

  creationDate: Date;

  creditedAmount: number;

  netToBeDeducted: number;
}

export class Bill {
  id: number;
  purchaseOrder: PurchaseOrder;
  deliveryNote: DeliveryNote;
  deadLine: Date;
  discount: number;
  creationDate: Date;
  deliveryFee: number;
  transportationFee: number;
  impactedAccount: Account;
  subTotal: number;
  netTotal: number;
  ourSignatoryFunction: string;
  ourSignatory: string;
  clientSignatoryFunction: string;
  clientSignatory: string;
  emitter: any;
  contactInfo: Contact;
}

export class Account {

  id:number;
  bankName: string;
  holder: string;
  reference: string;
  rib: string;
  iban: string;
  swiftCode: string;
}

export class BillForDownload {

  vessel: string;
  creation: Date;
  contact: string;
  port: string;
  yourRef: string;
  dueDate: Date;
  billTo: string;
  noteId: string;
  billId: string;

  subTotal: number;
  discount: number;
  netTotal: number;
  delfee: number;

}
