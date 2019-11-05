import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  public productTable$: Observable<Array<ProductTable>>;
  public products$: Observable<Array<Product>>;
  public selectedProduct: Product;
  public products: Array<Product>;
  public productSearchForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) {
    this.products$ = this.productService.findAll();
    this.productTable$ = this.products$.pipe(
      map(products => products.map(product => {
        return new ProductTable(product.id, product.name);
      }))
    );
    this.productSearchForm = this.fb.group({productNameCSV: ''});
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

  findProduct() {
    let productNameCSV: string  = this.productSearchForm.value.productNameCSV;
    let customerNameList: Array<string> = productNameCSV != undefined && productNameCSV.trim().length > 0 ? productNameCSV.split(';') : [];
    this.products$ = this.productService.findProduct(customerNameList);
    this.productTable$ = this.products$.pipe(
      map(products => products.map(product => {
        return new ProductTable(product.id, product.name);
      }))
    );
    this.products$.subscribe(product => this.products = product);
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
