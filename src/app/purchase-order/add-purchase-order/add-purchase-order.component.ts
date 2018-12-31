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

class ReferenceItem {
label: string;
value: string;

}

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {

  customer: Customer;
  deliveryAddressForm: FormGroup;
  productToFindForm: FormGroup;
  foundProducts$: Observable<Array<Product>>;
  selectedProductForm: FormGroup;
  private showItemConfig: boolean;
  private purchaseOrder: PurchaseOrder;
  private showAddAnotherProductButton: boolean;
  private showSelectDeliveryAddress: boolean;
  private selectedProduct: Product;
  private currentCustomer$: Observable<Customer>;
  private paymentInfoForm: FormGroup;
  private paymentMeans: Array<ReferenceItem> = [{label:"Cash", value: "CASH"},{label:"Bank transfer", value:"BANK_TRANSFER"}];
  private paymentStatus: Array<ReferenceItem> = [{label:"Paid", value: "Paid"},{label:"Pending", value:"Pending"}, {label:"Partially paid", value:"PARTIALLY_PAID"}];

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private purchaseOrderService: PurchaseOrderService,
              private productService: ProductService,
              private route: ActivatedRoute) {
    let customerId;
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['customerId']) {
        customerId = params['customerId']
      }
    });

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
    this.selectedProductForm = this.fb.group({
      product: [],
      overridePrice: false,
      description: [''],
      quantity: [0],
      unit: [0]
    });
    this.deliveryAddressForm = this.fb.group({
      address: []
    });
    this.paymentInfoForm = this.fb.group({
      payMeans: "",
      payStatus: ""
    });
    this.purchaseOrder = {id: null, customer: null, deliveryInformation: null, itemList: [] }
  }

  ngOnInit() {
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
