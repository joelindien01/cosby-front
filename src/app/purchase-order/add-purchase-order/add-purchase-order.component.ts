import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddressService} from "../../common/address.service";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {Item, PurchaseOrder} from "../PurchaseOrder";
import {PurchaseOrderService} from "../purchase-order.service";

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {

  customer: Customer;
  deliveryAddressForm: FormGroup;
  productToFindForm: FormGroup;
  foundProducts: Array<Product>;
  selectedProductForm: FormGroup;
  private showItemConfig: boolean;
  private purchaseOrder: PurchaseOrder;
  private showAddAnotherProductButton: boolean;
  private showSelectDeliveryAddress: boolean;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private purchaseOrderService: PurchaseOrderService) {
    //this.customer = customerService.customer;
    this.productToFindForm = this.fb.group({
      productToFindName: [""]
    });
    this.selectedProductForm = this.fb.group({
      product: [],
      description: [''],
      quantity: [0],
      unit: [0]
    });
    this.deliveryAddressForm = this.fb.group({
      address: []
    });
    //this.purchaseOrder = {id: null, customer: this.customer, deliveryAddress: null, itemList: [] }
  }

  ngOnInit() {
  }

  findProductByName() {
    console.log("product to find: "+ this.productToFindForm.get('productToFindName').value);
    this.foundProducts = [{id:1, name: "first product", prices: [{id:1, label: "favorite client price", value: 36},
      {id:1, label: "VIP client price", value: 76}]},

      {id:2, name: "second product", prices: [{id:1, label: "autumn price", value: 43},
        {id:1, label: "winter price", value: 87}]}
    ];
  }

  addProductToItems() {
    this.showItemConfig = true;
    const selectedProduct = this.selectedProductForm.get('product').value;
    console.log("selectedProduct is vvvv(look down)");
    console.log(selectedProduct);

  }

  saveItem() {
    const item:Item = this.selectedProductForm.value;
    this.purchaseOrder.itemList.push(item);
    alert("item saved");
    this.resetForms();
    this.showAddAnotherProductButton = true;
  }

  private resetForms() {
    this.productToFindForm.reset();
    this.selectedProductForm.reset();
  }

  addAnotherProduct() {
    //TODO restart process
  }

  createOrder() {
    this.purchaseOrder.deliveryAddress = this.deliveryAddressForm.get('address').value;
    console.log("order to create vvvv");
    console.log(this.purchaseOrder);
    this.purchaseOrderService.createOrder(this.purchaseOrder).subscribe(result =>{
      alert("order created");
    });

  }

  selectDeliveryAddress() {
    this.showSelectDeliveryAddress = true;
  }
}
