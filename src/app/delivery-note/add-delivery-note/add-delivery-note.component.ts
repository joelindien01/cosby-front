import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {DeliveryNoteDTO} from "../../purchase-order/PurchaseOrder";
import {startWith} from "rxjs/internal/operators";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";
import {UserService} from "../../common/user.service";
import {Observable} from "rxjs/Rx";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-add-delivery-note',
  templateUrl: './add-delivery-note.component.html',
  styleUrls: ['./add-delivery-note.component.scss']
})
export class AddDeliveryNoteComponent implements OnInit, OnDestroy {
  public deliveryNoteForm: FormGroup;
  public orderId: number;
  calendarStartDate: Date;
  matcher;
  private users$: Observable<Array<any>>;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private router: Router,
              private userService: UserService) {
    this.matcher = new MyErrorStateMatcher();

    this.route.params.subscribe(params => {
      if (params['orderId']) {
        this.orderId = params['orderId']
      }

      this.users$ = this.userService.findAllUsers();
      const date = isDefined(this.deliveryNoteService.deliveryNote) ? new Date(this.deliveryNoteService.deliveryNote.deliveryDate) : new Date;
      this.deliveryNoteForm = this.fb.group({
        id: [isDefined(this.deliveryNoteService.deliveryNote) ? this.deliveryNoteService.deliveryNote.id : null],
        deliveryDate: new FormControl(date, Validators.required),
        ourSignatoryObject: [''],
        ourSignatory: [isDefined(this.deliveryNoteService.deliveryNote) ? this.deliveryNoteService.deliveryNote.ourSignatory :''],
        ourSignatoryFunction: [{value:isDefined(this.deliveryNoteService.deliveryNote) ? this.deliveryNoteService.deliveryNote.ourSignatoryFunction :'', disabled: false }],
        customerSignatory: [isDefined(this.deliveryNoteService.deliveryNote) ? this.deliveryNoteService.deliveryNote.customerSignatory : ''],
        customerSignatoryFunction: [{value:isDefined(this.deliveryNoteService.deliveryNote) ? this.deliveryNoteService.deliveryNote.customerSignatoryFunction : '', disabled: false }],

      });
      this.deliveryNoteForm.controls['ourSignatoryObject'].valueChanges.subscribe(user => {

        this.deliveryNoteForm.controls['ourSignatoryFunction'].setValue(user.profile.name);
        this.deliveryNoteForm.controls['ourSignatory'].setValue(user.username);
      });
    });

  }

  ngOnInit() {
  }

  compareFunction(o1, o2) {
    return (isDefined(o1) && isDefined(o2) && o1.id == o2.id);
  }

  saveDeliveryNote() {
    if(this.deliveryNoteForm.invalid) {
      return;
    }
    let deliveryNoteDTO: DeliveryNoteDTO = this.deliveryNoteForm.value;
    deliveryNoteDTO.purchaseOrderId = this.orderId;
    this.deliveryNoteService.saveDeliveryNote(deliveryNoteDTO).subscribe(deliveryNote =>{
      alert("delivery note saved");

      this.router.navigateByUrl("/delivery-notes/"+deliveryNote.id).then();
    });
  }

  ngOnDestroy(){
    this.deliveryNoteService.deliveryNote = undefined;
  }

}

