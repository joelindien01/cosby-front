import {Component, OnInit, ViewChild, Inject, AfterViewInit, ElementRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, AbstractControl, FormControl} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Price, Product} from "../product";
import {GlobalUomService} from "../../uom/global-uom.service";
import {Observable} from "rxjs/Rx";
import {mergeMap} from "rxjs/operators";
import {Category, LinkedProductGroup, UnitOfMeasurement} from "../../uom/UnitOfMeasurement";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {isUndefined} from "util";
import {map, startWith} from "rxjs/internal/operators";
import {GroupComponent} from "../../reference-data/group/group.component";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReferenceDataService} from "../../reference-data/reference-data.service";
export class MealDTO {
  id: number;
  originProduct: ProductDTO;
  linkedProduct: ProductDTO;
  chargeAsExtra: boolean;
  multiSelect: boolean;
  maxQuantityForExtra: number;
  linkedProductGroup: LinkedProductGroup[];
}
export class ProductDTO {
  id: number;
  name: string;
  prices: Price[];
  uomSet: UnitOfMeasurement[];
  categories: Category[];
  description: string;
}
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
  groups$: Observable<Array<LinkedProductGroup>>;
  showLinkedProductsTable: boolean = false;
  productSetupForm: FormGroup = this.fb.group({ linkedProducts: this.fb.array([]) });

  showLinkedProductTable(value?: boolean) {
    this.showLinkedProductsTable =  this.linkOtherProduct && this.selectedProductList != undefined && this.selectedProductList.data.length >0 || value;
  }


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
              @Inject(MAT_DIALOG_DATA) public dialogData: any, private router: Router) {


    this.activatedRoute.params.subscribe(routeParams => {
      this.groups$ = this.referenceDataService.findAllGroup();
      const productId = routeParams['productId'];
      if(productId) {
        this.isEditMode = true;
         this.editProductWithName(productId);
      }else {
        this.initForm();
        this.initLinkedProductForm();
      }
    });

    this.uoms$ = uomService.findAllUOM();
    this.availableCategories$ = uomService.findAllCategoriesList();

    this.productForm = this.fb.group(
      {name: '',
        prices:this.fb.array([this.initPriceForm()]),
        uom: '',
        categories: [[]],
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
    if (prices != undefined) {
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
    /*let lpgFormValue = this.productSetupForm.value.linkedProducts;
    if(lpgFormValue.linkedProductGroup != undefined) {
      const groups = lpgFormValue.linkedProductGroup.map(idOfGroup=>{ return {id: idOfGroup}});
      lpgFormValue.linkedProductGroup = groups;
    }*/


    product.linkedProductsWithConfig = this.productSetupForm.value.linkedProducts;
    if(product.categories != undefined && product.categories.length >0 && product.categories[0].id == undefined ) {
      product.categories = product.categories.map(catId => {return {id: catId}});
    }

    product.uomSet = this.allowedUomSet;
    if (this.isEditMode) product.id = this.editedProduct.id;
    this.productService
      .saveProduct(product)
      .subscribe(result=> alert('product added'));
    console.log(this.productSetupForm.value);
    //this.reset();
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
    this.groups$.pipe(
      mergeMap((groups) => this.productService.findLinkedProductsSetup(productId))).subscribe(meals => {
      this.initLinkedProductForm(meals);
      /*let control: FormArray = <FormArray>this.productSetupForm.controls['linkedProducts'];
      control.push(this.initLinkedProductArray(meals));*/
      this.showLinkedProductTable(true);
    });

   /*this.productService.findLinkedProductsSetup(productId).subscribe( meals => {
     this.initLinkedProductForm(meals);
     /*let control: FormArray = <FormArray>this.productSetupForm.controls['linkedProducts'];
     control.push(this.initLinkedProductArray(meals));
     this.showLinkedProductTable(true);
   });*/
  }

  private initForm(product?: any) {

    this.priceModel = product ? this.initPriceForm(product.prices): this.initPriceForm();
    //TODO to be properly refactored
    if(product) {
      this.productForm = this.fb.group({
        name: [product.name],
        prices: this.fb.array(this.priceModel),
        uom: '',
        categories: [product.categories != undefined? product.categories.map(cat => cat.id) : []]
      });
      this.allowedUomSet = product.uomSet;
    } else {
      this.productForm = this.fb.group({
        name: [''],
        prices: this.fb.array([this.priceModel]),
        uom: '',
        categories: [[]]
      });
    }
    console.log(this.productForm.value);
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

  ngAfterViewInit() {
    console.log(this.productSetupForm.value);
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
      linkedProductGroup: null
    });
    this.selectedProductList.data = datasource;

    let control: FormArray = <FormArray>this.productSetupForm.controls['linkedProducts'];
    control.push(this.initLinkedProduct(product.id));
    this.showLinkedProductTable();
    console.log(this.productSetupForm.value);
    console.log(this.productForm.value);
  }

  private initLinkedProduct(linkedProductId?: number) {
    return this.fb.group({
      linkedProduct: {id: linkedProductId},
      chargeAsExtra: false,
      maxQuantityForExtra: 0,
      linkedProductGroup: []
    });
  }

  private initLinkedProductArray(mealDTOs: Array<MealDTO>) {
    const datasource = this.selectedProductList.data;
    //const controls: FormArray = this.fb.array([]);


    let control: FormArray = <FormArray>this.productSetupForm.controls['linkedProducts'];
    mealDTOs.forEach(meal => {
      /*let lpgIds;
      if(meal.linkedProductGroup != undefined) {
        lpgIds = meal.linkedProductGroup.map(g => {
          //return {id:g.id, label:g.label}
          return g.id;
        });
      } else {
        lpgIds = [];
      }*/

      const data = {
        id: meal.id,
        linkedProduct: {id: meal.linkedProduct.id, name: meal.linkedProduct.name},
        chargeAsExtra: meal.chargeAsExtra,
        maxQuantityForExtra: meal.maxQuantityForExtra,
        linkedProductGroup: []
      };
      datasource.push(data);
      //control.push(this.initLinkedProduct(meal.linkedProduct.id));
      let groupControl = this.fb.group(data);
      groupControl.controls['linkedProductGroup'].setValue(meal.linkedProductGroup);

      control.push(groupControl);

    });

    this.selectedProductList.data = datasource;
  }

  private initLinkedProductForm(meals?: Array<MealDTO>) {

    if(meals == undefined) {
      //this.productSetupForm = this.fb.group({ linkedProducts: this.fb.array([this.initLinkedProduct()]) });

    }else {
      //this.productSetupForm = this.fb.group({ linkedProducts: this.fb.array([this.initLinkedProductArray()]) });
      this.productSetupForm = this.fb.group({ linkedProducts: this.fb.array([]) });

      this.initLinkedProductArray(meals);
      console.log(this.productSetupForm);
    }

  }


  private reset() {
    this.router.navigateByUrl("/products").then();
  }
}
