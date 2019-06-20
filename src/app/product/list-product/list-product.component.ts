import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  productTable$: Observable<Array<ProductTable>>;
  products$: Observable<Array<Product>>;
  selectedProduct: Product;
  private products: Array<Product>;

  constructor(private productService: ProductService, private router: Router) {
    this.products$ = this.productService.findAll();
    this.productTable$ = this.products$.pipe(
      map(products => products.map(product => {
        return new ProductTable(product.id, product.name);
      }))
    );
  }

  ngOnInit() {
    this.products$.subscribe(products => this.products = products);
  }

  viewSelectedProduct(productId: number) {
    this.selectedProduct = this.products.find(product => product.id == productId);
  }

  editSelectedProduct(productId?: number) {
    const productToEditId = productId ? productId : this.selectedProduct.id;
    this.router.navigate(['/product', {productId: productToEditId}]).then();
  }
}

export class ProductTable {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
