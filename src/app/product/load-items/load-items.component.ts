import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-load-items',
  templateUrl: './load-items.component.html',
  styleUrls: ['./load-items.component.scss']
})
export class LoadItemsComponent implements OnInit {

  constructor(public productService: ProductService) {
    this.productService.afuConfig.uploadAPI.url = this.productService.getLoadItemsForPOUrl();
    //this.productService.afuConfig.formatsAllowed = "csv";
  }

  ngOnInit() {
  }

  getReceivedItems($event: Event) {
    console.log($event);
  }
}
