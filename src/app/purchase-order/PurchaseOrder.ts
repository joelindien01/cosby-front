import {Address, Customer} from "../customer/customer";
import {Product} from "../product/product";

export class PurchaseOrder {
  id: number;
  customer: Customer;
  deliveryAddress: Address;
  itemList: Item[];
}

export class Item {
  id: number;
  product: Product;
  description: string;
  quantity: number;
  unit: number;
  amount: number;
}
