import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  constructor(public cartService: CartService, public dialogRef: MatDialogRef<ViewCartComponent>, private router: Router) { }

  ngOnInit() {
  }

  goBackToProduct() {

  }

  goToPurchaseOrderPage() {
    this.dialogRef.close();
    this.router.navigate(['/purchase-order', {customerId: this.cartService.selectedCustomer.id}]).then();
  }

  emptyCart() {
    this.cartService.items = [];
  }
}
