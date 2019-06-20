import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {Price, Product} from "../product";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  priceModel: any;
  private isEditMode: boolean;
  private editedProduct: Product;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(routeParams => {
      const productId = routeParams['productId'];
      if(productId) {
        this.isEditMode = true;
         this.editProductWithName(productId);
      }else {
        this.initForm();
      }
    });

  }

  ngOnInit() {
    this.productForm = this.fb.group({name: '', prices:this.fb.array([this.initPriceForm()])});
  }

  addPrice() {
    // add address to the list
    let control: FormArray = <FormArray>this.productForm.controls['prices'];
    control.push(this.initPriceForm());
  }

  removePrice(i: number) {
    // remove address from the list
    let control = <FormArray>this.productForm.controls['prices'];
    control.removeAt(i);
  }

  private initPriceForm(prices?: Array<Price>) {
    let formModel;
    if (prices) {
      formModel = prices.map(price => this.fb.group({
        id: price.id,
        label: [price.label],
        value: [price.value]
      }));
    } else {
      formModel = this.fb.group({
        label: [''],
        value: ['']
      });
    }
    return formModel;
  }

  saveProduct() {
    let product = this.productForm.value;
    if (this.isEditMode) product.id = this.editedProduct.id;
    this.productService
      .saveProduct(product)
      .subscribe(result=> alert('product added'));
  }

  private editProductWithName(productId: any) {
   this.productService.findProductById(productId).subscribe(product => {
     this.editedProduct = product;
     this.initForm(product);
   });
  }

  private initForm(product?: Product) {

    this.priceModel = product ? this.initPriceForm(product.prices): this.initPriceForm();
    //TODO to be properly refactored
    if(product) {
      this.productForm = this.fb.group({
        name: [product.name],
        prices: this.fb.array(this.priceModel)
      });

    } else {
      this.productForm = this.fb.group({
        name: [''],
        prices: this.fb.array([this.priceModel])
      });
    }
  }
}
