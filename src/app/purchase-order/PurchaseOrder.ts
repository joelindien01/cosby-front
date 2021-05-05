import {Address, Contact, Customer, DeliveryInformation} from "../customer/customer";
import {Product} from "../product/product";
import {Currency, UnitOfMeasurement} from "../uom/UnitOfMeasurement";
import {ObjectStatus} from "./list-purchase-orders/list-purchase-orders.component";

export class PurchaseOrder {
  id: number;
  customer: Customer;
  creationDate: Date;
  deliveryInformation: DeliveryInformation;
  itemList: Item[];
  totalAmount: number;
  paymentInformation: any;
  poNumber: string;
  contactInfo: Contact;
  status: ObjectStatus;
}

export class Item {
  id: number;
  product: Product;
  description: string;
  quantity: number;
  unit: number;
  amount: number;
  unitOfMeasurement: UnitOfMeasurement;
}
export class ItemDto {
  id: number;
  productName: string;
  description: string;
  quantity: number;
  unit: number;
  amount: number;
  unitOfMeasurement: UnitOfMeasurement;
}
export class PurchaseOrderDTO {

  order: PurchaseOrder;
  informationDTO: PaymentInformationDTO;
}

export class PaymentInformationDTO {
  payMean: string;
  payStatus: string;
  currency: Currency;
}

export class DeliveryNote {
  id: number;
  purchaseOrder: PurchaseOrder;
  deliveryDate: Date;
  creationDate: Date;
  ourSignatory: string;
  ourSignatoryFunction: string;
  customerSignatory: string;
  customerSignatoryFunction: string;
  status: ObjectStatus;
  emitter: any;
}

export class DeliveryNoteDTO {
  purchaseOrderId: number;
  deliveryDate: Date;
  creationDate: Date;
  id: number;
}
