import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";
import {Price, Product} from "../product";
import {GlobalUomService} from "../../uom/global-uom.service";
import {Observable} from "rxjs/Rx";
import {Category, LinkedProductGroup, UnitOfMeasurement} from "../../uom/UnitOfMeasurement";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {isUndefined} from "util";
import {map, startWith} from "rxjs/internal/operators";
import {GroupComponent} from "../../reference-data/group/group.component";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReferenceDataService} from "../../reference-data/reference-data.service";

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
  public availableCategories$: Observable<Array<Category>>;
  public uoms: Array<UnitOfMeasurement> = [];
  public allowedUomSet: Array<UnitOfMeasurement> = [];
  public filteredUoms$: Observable<UnitOfMeasurement[]>;
  public linkOtherProduct: boolean = true;
  public productToFindForm: FormGroup;
  private foundProducts$: Observable<Product[]>;
  selectedProductList: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['productName', 'chargeAsExtra', 'maxQuantityForExtra', 'group'];
  linkedProductsFormArray: FormArray = this.fb.array([]);
  productSetupForm: FormGroup = this.fb.group({ 'linkedProducts': this.linkedProductsFormArray });
  groups$: Observable<Array<LinkedProductGroup>>;


  onLinkOtherProduct(checkedValue: boolean) {
    console.log(checkedValue);
    if(!checkedValue) {
      this.selectedProductList = new MatTableDataSource();
      this.foundProducts$ = Observable.create();
    }
  }
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private uomService: GlobalUomService,
              private referenceDataService: ReferenceDataService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {

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
    this.availableCategories$ = uomService.findAllCategoriesList();
    this.productForm = this.fb.group(
      {name: '',
        prices:this.fb.array([this.initPriceForm()]),
        uom: '',
        categories: '',
        description: '',
        mealCompositionSetup: this.fb.array([this.initMealCompositionSetup()])
      });

    this.uoms$.subscribe( result => {
      this.uoms = result;
      this.filteredUoms$ = this.productForm.controls['uom'].valueChanges.pipe(
        startWith(null),
        map((uomLabel: string | null) => uomLabel ? this._filter(uomLabel) : this.uoms.slice()));
    });

    this.productToFindForm = this.fb.group({
      productToFindName: [null]
    });

    this.groups$ = this.referenceDataService.findAllGroup();

  }

  openGroupDialog(): void {
    const dialogRef = this.dialog.open(GroupComponent, {
      width: '50%',
      data: {showList: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.groups$ = this.referenceDataService.findAllGroup();
      }
    });
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '50%',
      data: {modalMode: true}
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
    product.linkedProductsWithConfig = this.productSetupForm.value.linkedProducts;
    product.uomSet = this.allowedUomSet;
    if (this.isEditMode) product.id = this.editedProduct.id;
    this.productService
      .saveProduct(product)
      .subscribe(result=> alert('product added'));
  }

  findProductByName() {
    console.log("product to find: "+ this.productToFindForm.get('productToFindName').value);
    const productToFound = this.productToFindForm.get('productToFindName').value;
    this.foundProducts$ = this.productService.findProductByName(productToFound);
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

  /*
   id,
   linkedProduct,
   chargeAsExtra,
   maxQuantityForExtra,
   linkedProductGroup
   */

  private initMealCompositionSetup() {
    return this.fb.group({
      id: null,
      linkedProduct: {id: null},
      chargeAsExtra: false,
      maxQuantityForExtra: 1,
      linkedProductGroup: this.fb.array([])
    })
  }

  addToSelectedProductsList(product: Product) {
    console.log(product);
    const datasource = this.selectedProductList.data;
    if(datasource.findIndex(d => d.linkedProduct.id == product.id) != -1) {
      return;
    }
    datasource.push({
      linkedProduct : product,
      chargeAsExtra: false,
      maxQuantityForExtra: 0,
      linkedProductGroup: ''
    });
    this.selectedProductList.data = datasource;
    this.linkedProductsFormArray.push(this.initLinkedProduct(product.id));
  }

  private initLinkedProduct(linkedProductId?: number) {
    return this.fb.group({
      linkedProduct: {id: linkedProductId},
      chargeAsExtra: false,
      maxQuantityForExtra: 2,
      linkedProductGroup: ''
    });
  }
}
