import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {CartService} from "../../cart/cart.service";
import {Router} from "@angular/router";
import {isDefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";

@Component({
  selector: 'app-load-items',
  templateUrl: './load-items.component.html',
  styleUrls: ['./load-items.component.scss']
})
export class LoadItemsComponent implements OnInit {

  constructor(public productService: ProductService, public cartService: CartService, private router: Router) {
    this.productService.afuConfig.uploadAPI.url = this.productService.getLoadItemsForPOUrl();
    //this.productService.afuConfig.formatsAllowed = "csv";
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
    this.router.navigate(['/purchase-order',{customerId: 1}]).then();
  }
}
