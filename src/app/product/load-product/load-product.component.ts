import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss']
})
export class LoadProductComponent implements OnInit {

  constructor(public productService: ProductService) {
    this.productService.afuConfig.uploadAPI.url = this.productService.getProductLoadUrl();
  }

  ngOnInit() {
  }

}
