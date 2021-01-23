import {Address, Customer, DeliveryInformation} from "../customer/customer";
import {Product} from "../product/product";
import {UnitOfMeasurement} from "../uom/UnitOfMeasurement";

export class PurchaseOrder {
  id: number;
  customer: Customer;
  creationDate: Date;
  deliveryInformation: DeliveryInformation;
  itemList: Item[];
  totalAmount: number;
  paymentInformation: any
}

export class Item {
  id: number;
  product: Product;
  description: string;
  quantity: number;
  unit: number;
  amount: number;
}
export class ItemDto {
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
}

export class DeliveryNote {
  id: number;
  purchaseOrder: PurchaseOrder;
  deliveryDate: Date;
  creationDate: Date;
}

export class DeliveryNoteDTO {
  purchaseOrderId: number;
  deliveryDate: Date;
  creationDate: Date;
  id: number;
}
