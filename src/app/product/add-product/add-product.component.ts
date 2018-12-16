import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {TitleModel} from "../../common/form-array/form-array.component";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  titleModel: TitleModel;
  priceModel: any;
  constructor(private fb: FormBuilder, private productService: ProductService) {

    this.titleModel = {arrayName: "prices", addTitle: "ajouter", formTitle: "Prices"};
    this.priceModel = this.initPriceForm();
    this.productForm = this.fb.group({
      name: [''],
      prices: this.fb.array([this.priceModel])
    });


  }

  ngOnInit() {
  }

  addPrice() {
    // add address to the list
    const control = <FormArray>this.productForm.controls['prices'];
    control.push(this.initPriceForm());
  }

  removePrice(i: number) {
    // remove address from the list
    const control = <FormArray>this.productForm.controls['prices'];
    control.removeAt(i);
  }

  private initPriceForm() {
    return this.fb.group({
      label: [''],
      value: ['']
    });
  }

  saveProduct() {
    this.productService
      .saveProduct(this.productForm.value)
      .subscribe(result=> alert('product added'));
  }

}
