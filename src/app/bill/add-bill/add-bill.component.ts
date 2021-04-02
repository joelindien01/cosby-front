import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BillService} from "../bill.service";
import {Account, BillDTO} from "../bill";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AccountService} from "../../account/account.service";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";

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
  accounts$: Observable<Array<Account>>;
  matcher;

  constructor(private fb: FormBuilder, private billService: BillService, private accountService :AccountService , private route: ActivatedRoute) {

    this.accounts$ = this.accountService.findAllAccounts();
    this.billForm = this.fb.group({
      deadLine: new FormControl(new Date(), Validators.required),
      discount: [0, Validators.required],
      applyDiscount: [false],
      deadlines: [],
      deliveryFee: [0, Validators.required],
      transportationFee: [0, Validators.required],
      ourSignatory: [null, Validators.required],
      ourSignatoryFunction: [null,Validators.required],
      customerSignatory: [null],
      customerSignatoryFunction: [null],
      impactedAccount: [null,Validators.required]
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

    this.onChanges();

    this.matcher = new MyErrorStateMatcher();
    /* TODO pour avoir les url en /bill;orderId=1 à utiliser depuis le component order-list
    this.router.navigate(['/bill/add', {orderId: term}]);*/
  }

  ngOnInit() {

  }

  private onChanges() {
    this.billForm.valueChanges.subscribe(val => {


      Object.keys(this.billForm.controls).forEach(key => {
        this.billForm.controls[key].markAsTouched();
      }) ;
      /*elements.controls.forEach(el =>{
        let elt = <FormGroup> el;
        Object.keys(elt.controls).forEach(key => {
          elt.controls[key].markAsTouched();
        }) ;
        el.setErrors(elt.errors);
        //elt.controls.
      });*/
      // /this.formGroup.controls[this.arrayName].markAsTouched({onlySelf: true})
    });
  }

  saveBill() {
    if(this.billForm.invalid) {
      this.billForm.markAsTouched({onlySelf: true});
      Object.keys(this.billForm.controls).forEach(key => {
        this.billForm.controls[key].markAsTouched();
      }) ;
      return;
    }
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
