import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BillService} from "../bill.service";
import {Account, Bill, BillDTO} from "../bill";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AccountService} from "../../account/account.service";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";
import {UserService} from "../../common/user.service";
import {isDefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit, OnDestroy {
  public billForm: FormGroup;
  public applyDiscount: boolean;
  public orderId: number;
  public customerId: number;
  accounts$: Observable<Array<Account>>;
  matcher;
  users$: Observable<Array<any>>;


  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private billService: BillService, private accountService :AccountService , private route: ActivatedRoute) {

    this.users$ = this.userService.findAllUsers();
    this.accounts$ = this.accountService.findAllAccounts();
    const bill: Bill = isDefined(this.billService.bill) ? this.billService.bill : undefined;
    const deadLine = isDefined(bill) ? new Date(bill.deadLine) : new Date();
    const issueDate = isDefined(bill) ? new Date(bill.issueDate) : new Date();
    this.billForm = this.fb.group({
      id: isDefined(bill) ? bill.id : null,
      deadLine: new FormControl(deadLine, Validators.required),
      issueDate: new FormControl(issueDate, Validators.required),
      discount: [isDefined(bill) ? bill.discount :0, Validators.required],
      applyDiscount: [isDefined(bill) && bill.discount > 0],
      deadlines: [],
      deliveryFee: [isDefined(bill) ? bill.deliveryFee : 0, Validators.required],
      transportationFee: [isDefined(bill) ? bill.transportationFee : 0, Validators.required],
      ourSignatoryObject: [null],
      ourSignatory: [isDefined(bill) ? bill.ourSignatory : ''],
      ourSignatoryFunction: [{value:isDefined(bill) ? bill.ourSignatoryFunction : '', disabled: false }],
      customerSignatory: [isDefined(bill) ? bill.customerSignatory : ''],
      customerSignatoryFunction: [{value:isDefined(bill) ? bill.customerSignatoryFunction : '', disabled: false }],
      impactedAccount: [isDefined(bill) ? bill.impactedAccount : null]
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

    this.billForm.controls['ourSignatoryObject'].valueChanges.subscribe(user => {

      this.billForm.controls['ourSignatoryFunction'].setValue(user.profile.name);
      this.billForm.controls['ourSignatory'].setValue(user.username);
    });
    this.billForm.controls['deadlines'].valueChanges.subscribe(value => {
      this.computeDeadline();
    });
  }

  compareFunction(o1, o2) {
    return (isDefined(o1) && isDefined(o2) && o1.id == o2.id);
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
      this.router.navigateByUrl("/bills/"+result).then();
    });
  }

  computeDeadline() {
    const nbDays = this.billForm.controls['deadlines'].value;
    const deadlineDate = new Date().setDate(new Date().getDate() +nbDays);
    this.billForm.controls['deadLine'].setValue(new Date(deadlineDate));
    console.log(this.billForm.controls['deadLine'].value);
  }

  ngOnDestroy() {
    this.billService.bill = undefined;
  }
}
