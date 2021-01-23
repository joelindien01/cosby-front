import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {Price, Product} from "../product";
import {GlobalUomService} from "../../uom/global-uom.service";
import {Observable} from "rxjs/Rx";
import {UnitOfMeasurement} from "../../uom/UnitOfMeasurement";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {isUndefined} from "util";
import {map, startWith} from "rxjs/internal/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  productForm: FormGroup;
  priceModel: any;
  public isEditMode: boolean;
  public editedProduct: Product;
  public  uoms$: Observable<Array<UnitOfMeasurement>>;
  public uoms: Array<UnitOfMeasurement> = [];
  public allowedUomSet: Array<UnitOfMeasurement> = [];
  public filteredUoms$: Observable<UnitOfMeasurement[]>;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute, private uomService: GlobalUomService) {

    this.activatedRoute.params.subscribe(routeParams => {
      const productId = routeParams['productId'];
      if(productId) {
        this.isEditMode = true;
         this.editProductWithName(productId);
      }else {
        this.initForm();
      }
    });

    this.uoms$ = uomService.findAllUOM();
    this.productForm = this.fb.group({name: '', prices:this.fb.array([this.initPriceForm()]), uom: ''});

    this.uoms$.subscribe( result => {
      this.uoms = result;
      this.filteredUoms$ = this.productForm.controls['uom'].valueChanges.pipe(
        startWith(null),
        map((uomLabel: string | null) => uomLabel ? this._filter(uomLabel) : this.uoms.slice()));
    });

  }

  ngOnInit() {

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
    product.uomSet = this.allowedUomSet;
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
        prices: this.fb.array(this.priceModel),
        uom: ''
      });
      this.allowedUomSet = product.uomSet;
    } else {
      this.productForm = this.fb.group({
        name: [''],
        prices: this.fb.array([this.priceModel]),
        uom: ''
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const id = event.value;

    // Add our fruit
    if ((id || '').trim()) {
      //this.allowedUomSet.push("");
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.productForm.controls['uom'].setValue(null);
  }

  remove(uomId: number): void {
    const index = this.allowedUomSet.findIndex(uom => uom.id == uomId);

    if (index >= 0) {
      this.allowedUomSet.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("");
    const selectedUomLabel = event.option.value;
    const alreadySelected = this.allowedUomSet.find(uom => uom.label.toLowerCase() == selectedUomLabel);
    if(isUndefined(alreadySelected)) {
      const foundUom = this.uoms.find(uom => uom.label == selectedUomLabel);
      this.allowedUomSet.push(foundUom);
    }
    //this.fruitInput.nativeElement.value = '';
    //this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): UnitOfMeasurement[] {
    const filterValue = value.toLowerCase();

    // this.uoms.filter(uom => uom.label.indexOf(filterValue) === 0); recherche par le début
    return this.uoms.filter(uom => uom.label.includes(filterValue)) //  recherche par contenu;
  }


}
