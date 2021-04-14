import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {Observable} from "rxjs/index";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Currency} from "../../uom/UnitOfMeasurement";
import {GlobalUomService} from "../../uom/global-uom.service";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {CartService} from "../../cart/cart.service";
import {ShipService} from "../../common/ship.service";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";


export class ReferenceItem {
label: string;
value: string;
}

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {

  public panelOpenState: boolean;

  currencyList$: Observable<Array<Currency>>;
  customer: Customer;
  deliveryAddressForm: FormGroup;
  productToFindForm: FormGroup;
  foundProducts$: Observable<Array<Product>>;
  selectedProductForm: FormGroup;
  public showItemConfig: boolean;
  public purchaseOrder: PurchaseOrder;
  public showAddAnotherProductButton: boolean;
  public showSelectDeliveryAddress: boolean;
  public selectedProduct: Product;
  public selectedProducts: Array<any> = [];
  public currentCustomer$: Observable<Customer>;
  public paymentInfoForm: FormGroup;
  public poSetupForm: FormGroup;
  public paymentMeans: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];
  productAlreadySelected: boolean;
  public matcher;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private purchaseOrderService: PurchaseOrderService,
              private productService: ProductService,
              private uomService: GlobalUomService,
              private route: ActivatedRoute,
              public cartService: CartService, public shipService: ShipService) {
    this.matcher = new MyErrorStateMatcher();
    this.panelOpenState = true;
    this.currencyList$ = this.uomService.findAllCurrencyList();
    const routeParams$ = this.route.params;
    this.currentCustomer$ = routeParams$.pipe(
      switchMap(params => {
        const customerId = params['customerId'];
        if (customerId) {
          return this.customerService.findCustomerById(customerId);
        }
      }));
    this.currentCustomer$.subscribe(currentCustomer => this.customer = <Customer> currentCustomer);

    this.poSetupForm = this.fb.group({
      poNumber: ['', Validators.required],
      currency: ['', Validators.required],
      contact: ['', Validators.required],
      payMeans: ['', Validators.required],
      payStatus: ['', Validators.required],
      deliveryAddress: this.fb.group( {
        vessel: ['', Validators.required],
        imo: ['', Validators.required],
        flag: ['', Validators.required],
        master: ['', Validators.required],
        port: ['', Validators.required]
      })
    });

  }

  ngOnInit() {
    this.purchaseOrder = new PurchaseOrder();
    this.purchaseOrder.itemList = [];
  }

  findProductByName() {
    console.log("product to find: "+ this.productToFindForm.get('productToFindName').value);
    const productToFound = this.productToFindForm.get('productToFindName').value;
    this.foundProducts$ = this.productService.findProductByName(productToFound);
  }

  getProducts() {
    return this.cartService.getItems().map(item => item.product);
  }

  private resetForms() {
    this.productToFindForm.reset();
    this.foundProducts$ = null;
    this.selectedProductForm.reset();
    this.selectedProduct = null;
  }

  createOrder() {
    if(this.poSetupForm.invalid) {
      Object.keys(this.poSetupForm.controls).forEach(key => {
        this.poSetupForm.controls[key].markAsTouched();
      });
      return;
    }
    let po = this.poSetupForm.value;
    po.customer = this.customer;
    po.items = this.cartService.getItems();
    console.log(this.purchaseOrder);
    this.purchaseOrderService.createOrder(po).subscribe(result =>{
      alert("order created");
    });

  }

}
