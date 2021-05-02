import {Component, OnInit, OnDestroy} from '@angular/core';
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {Observable} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Currency} from "../../uom/UnitOfMeasurement";
import {GlobalUomService} from "../../uom/global-uom.service";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {CartService} from "../../cart/cart.service";
import {ShipService} from "../../common/ship.service";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";
import {isDefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";


export class ReferenceItem {
label: string;
value: string;
}

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit, OnDestroy {

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
              private router: Router,
              public cartService: CartService, public shipService: ShipService) {
    this.matcher = new MyErrorStateMatcher();
    this.panelOpenState = true;
    this.currencyList$ = this.uomService.findAllCurrencyList();
    const routeParams$ = this.route.params;

    this.currentCustomer$ = routeParams$.pipe(
      switchMap(params => {
        const customerId = params['customerId'];
        const poId = params['poId'];
        if(isDefined(poId) && isDefined(this.cartService.items) && this.cartService.items.length <=0 ) {
          this.router.navigate(['/purchase-order/'+poId]).then();
        }
        if (customerId) {
          return this.customerService.findCustomerById(customerId);
        }
      }));
    this.currentCustomer$.subscribe(currentCustomer => this.customer = <Customer> currentCustomer);
    const po = this.purchaseOrderService.po ;
    this.poSetupForm = this.fb.group({
      id: [isUndefined(po) ? null: po.id],
      poNumber: [isUndefined(po) ? '': po.poNumber, Validators.required],
      currency: [isUndefined(po) ? '': po.paymentInformation.currency, Validators.required],
      contact: [isUndefined(po) ? '': po.contactInfo, Validators.required],
      payMeans: [isUndefined(po) ? '': po.paymentInformation.paymentMethod, Validators.required],
      payStatus: [isUndefined(po) ? '': po.paymentInformation.paymentStatus, Validators.required],
      deliveryAddress: this.fb.group( {
        id: [isUndefined(po) ? '': po.deliveryInformation.id],
        vessel: [isUndefined(po) ? '': po.deliveryInformation.vessel, Validators.required],
        imo: [isUndefined(po) ? '': po.deliveryInformation.vessel, Validators.required],
        flag: [isUndefined(po) ? '': po.deliveryInformation.flag, Validators.required],
        master: [isUndefined(po) ? '': po.deliveryInformation.master, Validators.required],
        port: [isUndefined(po) ? '': po.deliveryInformation.port, Validators.required]
      })
    });

  }

  compareFunction(o1: any, o2: any) {
    return (isDefined(o1) && isDefined(o2) && o1.id == o2.id);
  }
  payInfoCompare(o1: string, o2:string){
    return isDefined(o1) && isDefined(o2) && o1.toLowerCase()==o2.toLowerCase();
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
      this.cartService.items = [];
      this.router.navigate(['/purchase-order/'+result]).then();
    });

  }

  ngOnDestroy() {
    this.purchaseOrderService.po = undefined;
  }

}
