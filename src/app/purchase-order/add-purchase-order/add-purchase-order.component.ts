import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";
import {Observable} from "rxjs/index";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Currency} from "../../uom/UnitOfMeasurement";
import {GlobalUomService} from "../../uom/global-uom.service";

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
  public selectedProducts: any = [];
  public currentCustomer$: Observable<Customer>;
  public paymentInfoForm: FormGroup;
  public poSetupForm: FormGroup;
  public paymentMeans: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  public paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private purchaseOrderService: PurchaseOrderService,
              private productService: ProductService,
              private uomService: GlobalUomService,
              private route: ActivatedRoute) {

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

    this.productToFindForm = this.fb.group({
      productToFindName: [null]
    });
    this.poSetupForm = this.fb.group({
      poNumber: '',
      currency: ''
    });
    this.selectedProductForm = this.fb.group({
      product: [],
      overridePrice: false,
      description: [''],
      quantity: [0],
      unit: [0],
      unitOfMeasurement: ['']
    });
    this.deliveryAddressForm = this.fb.group({
      address: []
    });
    this.paymentInfoForm = this.fb.group({
      payMeans: "",
      payStatus: ""
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

  addProductToItems() {
    this.showItemConfig = true;
    this.selectedProduct = this.selectedProductForm.get('product').value;
  }

  saveItem() {
    const item = this.selectedProductForm.value;
    delete item.overridePrice;
    this.purchaseOrder.itemList.push(item);
    console.log(this.purchaseOrder);
    alert("item saved");
    this.selectedProducts.push({name: this.selectedProduct.name,
      description: this.selectedProductForm.get('description').value,
      quantity: this.selectedProductForm.get('quantity').value,
      unit: this.selectedProductForm.get('unit').value,
      unitOfMeasurement: this.selectedProductForm.get('unitOfMeasurement').value});
    this.resetForms();
    this.showAddAnotherProductButton = true;
  }

  private resetForms() {
    this.productToFindForm.reset();
    this.foundProducts$ = null;
    this.selectedProductForm.reset();
    this.selectedProduct = null;
  }

  addAnotherProduct() {
    this.showAddAnotherProductButton = !this.showAddAnotherProductButton;
    //TODO restart process
  }

  createOrder() {
    this.purchaseOrder.deliveryInformation = this.deliveryAddressForm.get('address').value;
    this.purchaseOrder.customer = this.customer;
    console.log("order to create vvvv");
    console.log(this.purchaseOrder);
    this.purchaseOrderService.createOrder({order: this.purchaseOrder, informationDTO: this.paymentInfoForm.value}).subscribe(result =>{
      alert("order created");
    });

  }

  selectDeliveryAddress() {
    this.showSelectDeliveryAddress = true;
  }
}
