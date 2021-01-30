import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BillService} from "../bill.service";
import {Account, BillDTO} from "../bill";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  public billForm: FormGroup;
  public applyDiscount: boolean;
  public orderId: number;
  public customerId: number;
  accounts$: Observable<Account>;

  constructor(private fb: FormBuilder, private billService: BillService, private accountService :AccountService , private route: ActivatedRoute) {
    this.accounts$ = this.accountService.findAllAccounts();
    this.billForm = this.fb.group({
      deadLine: new FormControl(new Date()),
      discount: 0,
      applyDiscount: false,
      deadlines: [],
      deliveryFee: 0,
      transportationFee: 0,
      ourSignatory:'',
      ourSignatoryFunction: '',
      customerSignatory: '',
      customerSignatoryFunction: '',
      impactedAccount: ''
    });

    this.route.params.subscribe(params => {
      console.log(params);
      if (params['deliveryNoteId']) {
        this.orderId = params['deliveryNoteId']
      }
      if (params['customerId']) {
        this.customerId = params['customerId'];
      }
    });

    /* TODO pour avoir les url en /bill;orderId=1 à utiliser depuis le component order-list
    this.router.navigate(['/bill/add', {orderId: term}]);*/
  }

  ngOnInit() {
  }

  saveBill() {
    let bill: BillDTO = <BillDTO> this.billForm.value;
    bill.deliveryNoteId = this.orderId;
    this.billService.saveBill(bill).subscribe(result => {
      alert("bill saved");
    });
  }

  computeDeadline() {
    const nbDays = this.billForm.controls['deadlines'].value;
    const deadlineDate = new Date().setDate(new Date().getDate() +nbDays);
    this.billForm.controls['deadLine'].setValue(new Date(deadlineDate));
    console.log(this.billForm.controls['deadLine'].value);
  }
}
