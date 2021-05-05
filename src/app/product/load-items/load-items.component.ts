import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {CartService} from "../../cart/cart.service";
import {Router} from "@angular/router";
import {isDefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";
import {CustomerService} from "../../customer/customer.service";

@Component({
  selector: 'app-load-items',
  templateUrl: './load-items.component.html',
  styleUrls: ['./load-items.component.scss']
})
export class LoadItemsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.cartService.dialogMode = false;
  }

  dialogMode: boolean;

  constructor(public productService: ProductService, public cartService: CartService, private router: Router, private customerService: CustomerService) {
    this.productService.afuConfig.uploadAPI.url = this.productService.getLoadItemsForPOUrl();
    this.cartService.dialogMode = true;
  }

  ngOnInit() {
  }

  getReceivedItems($event: any) {
    let results: Array<any> = $event.body;
    if(isUndefined(results)) {
      return;
    }
    results = results.map(result => {
      result.item.product = result.product;
      result.item.overridePrice = true;
    return result.item;
    });
    this.cartService.items = results;
    this.router.navigate(['/purchase-order',{customerId: this.cartService.selectedCustomer.id}]).then();
  }
}
