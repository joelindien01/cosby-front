import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BillService} from "../bill.service";
import {BillDTO} from "../bill";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  billForm: FormGroup;
  applyDiscount: boolean;
  private orderId: number;
  private customerId: number;

  constructor(private fb: FormBuilder, private billService: BillService, private route: ActivatedRoute) {
    this.billForm = this.fb.group({
      deadLine: [],
      discount: 0,
      applyDiscount: false
    });

    this.route.params.subscribe(params => {
      console.log(params);
      if (params['orderId']) {
        this.orderId = params['orderId']
      }
      if (params['customerId']) {
        this.customerId = params['customerId']
      }
    });

    /* TODO pour avoir les url en /bill;orderId=1 à utiliser depuis le component order-list
    this.router.navigate(['/bill/add', {orderId: term}]);*/
  }

  ngOnInit() {
  }

  saveBill() {
    let bill: BillDTO = <BillDTO> this.billForm.value;
    bill.purchaseOrderId = this.orderId;
    this.billService.saveBill(bill).subscribe(result => {
      alert("bill saved");
    });
  }
}
