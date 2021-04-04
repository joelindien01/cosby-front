import {Injectable} from "@angular/core";
import {Customer} from "../customer/customer";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  selectedCustomer: Customer;

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeFromCart(product: any) {
    const index = this.items.findIndex(cartProduct => cartProduct.product.id == product.product.id);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  findCardItemById(id) {
    return this.items.find(cartProduct => cartProduct.product.id == id );
  }
}
