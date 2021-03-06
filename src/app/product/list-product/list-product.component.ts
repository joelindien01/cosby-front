import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {NgxSpinnerService} from "ngx-spinner";
import {CartService} from "../../cart/cart.service";
import {ViewCartComponent} from "../../cart/view-cart/view-cart.component";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";
import {UserService} from "../../common/user.service";
import {DecoEnumPoRoles, DecoEnumProductRoles, EnumProductRoles} from "../../user/roles.enum";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {isDefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
@DecoEnumProductRoles
@DecoEnumPoRoles
export class ListProductComponent implements OnInit {
  public productTable$: Observable<Array<ProductTable>>;
  public products$: Observable<Array<Product>>;
  public selectedProduct: Product;
  public products: Array<Product>;
  @Input() public bindProducts: Array<Product>;

  public productSearchForm: FormGroup;
  public productTable: MatTableDataSource<ProductTable> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() isOrderView: boolean;
  matcher;

  displayedColumns: string[] = ['name', 'actions'];
  show: boolean;
  public itemsSetupForm: FormGroup;
  pageEvent: PageEvent;
  productRoles: EnumProductRoles;


  constructor(public cartService: CartService,
              private productService: ProductService,
              private router: Router, private fb: FormBuilder,
              private spinner: NgxSpinnerService, private dialog: MatDialog, private userService: UserService
  ) {
    this.show = false;
    this.spinner.show();
    this.matcher = new MyErrorStateMatcher();

  }

  drop(event: any) {
    const previous = this.cartService.getItemPosition(event.previousContainer.data.item);
    const current = this.cartService.getItemPosition(event.container.data.item);
    if(previous > 0 && current > 0) {
      moveItemInArray(this.cartService.items, previous - 1, current-1);
    }
  }

  addToCart(product, index:number) {
    const control = (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls)[index];
    if(control.invalid) {

      this.itemsSetupForm.updateValueAndValidity();
      Object.keys(control.controls).forEach(key => {
        (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls)[index].controls[key].markAsTouched();
      });
      (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls)[index].markAsTouched();
      (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls)[index].updateValueAndValidity();

      return;
    }
    this.cartService.addToCart(product);
  }

  openCart() {
    const dialogRef = this.dialog.open(ViewCartComponent, {
      width: '50%',
      data: {dialogMode: true}
    });
  }
  removeFromCart(product) {
    this.cartService.removeFromCart(product);
  }
  compareFunction(o1: any, o2: any) {
    return (isDefined(o1) && isDefined(o2) && o1.id == o2.id);
  }

  comparePriceFunction(o1: any, o2: any) {
    return (o1==o2);
  }
  mapProductTableWithFormInit(product) {

    const showCart: boolean = this.shouldShowAddToCart(product);
    let existingProduct;
    if(!showCart) {
      existingProduct = this.cartService.findCardItemById(product.id);
    }
    (<FormArray>this.itemsSetupForm.get('items')).push(this.fb.group({
      id:[existingProduct != undefined ? existingProduct.id : null],
      position: [existingProduct != undefined ? existingProduct.position : null],
      product: [product],
      overridePrice: existingProduct != undefined ? existingProduct.overridePrice : false,
      description: [''],
      quantity: [existingProduct != undefined ? existingProduct.quantity : 1, Validators.required],
      unit: [existingProduct != undefined ? existingProduct.unit : 1, Validators.required],
      unitOfMeasurement: [existingProduct != undefined ? existingProduct.unitOfMeasurement : '', Validators.required]
    }));
    //let pt = new ProductTable(product.id, product.name, this.shouldShowAddToCart(product));
    return new ProductTable(product, showCart, (<FormArray>this.itemsSetupForm.get('items')).length - 1);

  }

  ngOnInit() {

    this.itemsSetupForm = this.fb.group({
      items: this.fb.array([])
    });
    if(this.bindProducts == undefined) {
      this.products$ = this.productService.findAll().shareReplay();
    } else {
      this.products$ = Observable.of(this.bindProducts).shareReplay();
    }



    this.productTable$ = this.products$.pipe(
      map(products => products.map(product => {return this.mapProductTableWithFormInit(product)}))
    );

    this.productSearchForm = this.fb.group({productNameCSV: ''});

    this.productTable$.subscribe(p => {
      p.sort(this.comparePosition);
      this.productTable.data = p;
      this.productTable.paginator = this.paginator;
      this.productTable.sort = this.sort;
      this.show = true;
      this.spinner.hide();


    });

    this.products$.subscribe(products => this.products = products);
  }

  comparePosition(a, b) {

    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
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
    this.products$ = this.productService.findProduct(customerNameList).shareReplay();
    this.productTable$ = this.products$.pipe(
      map(products => products.map(product => {
        return this.mapProductTableWithFormInit(product);
      }))
    );
    this.productTable$.subscribe(p => {
      p.sort(this.comparePosition);
      this.productTable.data = p;
      this.productTable.paginator = this.paginator;
      this.productTable.sort = this.sort;
    });
    this.products$.subscribe(product => this.products = product);
  }

  shouldShowAddToCart(p: any) {
    return this.cartService.items.findIndex(item =>
      item.product.id == p.id ) == -1;
  }

  getControlFromProduct(p) {
    return (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls).findIndex( itemControl => {
        const itemCt = itemControl.controls['product'].value;
        return itemCt.id == p.product.id;
    });
  }

  switchPosition(indexToSwitch, item) {
    const itemPosition = this.cartService.getItemPosition(item);
    moveItemInArray(this.cartService.items, itemPosition - 1, indexToSwitch);
  }

  getPositions() {
    return Array.from(new Array(this.cartService.items.length), (x, i) => i);​​​​​​
  }

  changeValue(value, index?, event?) {
    Observable.from([value]).debounceTime(1000).subscribe(event => {
      if(isDefined(index)) {
        value = (<Array<FormGroup>>(<FormArray>this.itemsSetupForm.controls['items']).controls)[index].value;
      }
      if(isUndefined(this.cartService.items)){
        return;
      }
      const i = this.cartService.getItemPosition(value);
      if(i > 0) {
        this.cartService.items[i-1] = value;
      }
    });


  }
}

export class ProductTable  {
  product: Product;
  showAddCart: boolean = true;
  index: number;

  constructor(product:Product, showAddCart?: boolean, index?:number) {
    this.product = product;
    this.showAddCart = showAddCart;
    this.index = index;
  }
}


