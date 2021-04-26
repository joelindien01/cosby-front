import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {DeliveryNoteDTO} from "../../purchase-order/PurchaseOrder";
import {startWith} from "rxjs/internal/operators";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";
import {UserService} from "../../common/user.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-add-delivery-note',
  templateUrl: './add-delivery-note.component.html',
  styleUrls: ['./add-delivery-note.component.scss']
})
export class AddDeliveryNoteComponent implements OnInit {
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
    this.users$ = this.userService.findAllUsers();
    this.deliveryNoteForm = this.fb.group({
      deliveryDate: new FormControl(new Date(), Validators.required),
      ourSignatoryObject: [null, Validators.required],
      ourSignatory: [null, Validators.required],
      ourSignatoryFunction: [{value:'', disabled: false },Validators.required],
      customerSignatory: [null],
      customerSignatoryFunction: [{value:'', disabled: false }],

    });
    this.deliveryNoteForm.controls['ourSignatoryObject'].valueChanges.subscribe(user => {

      this.deliveryNoteForm.controls['ourSignatoryFunction'].setValue(user.profile.name);
      this.deliveryNoteForm.controls['ourSignatory'].setValue(user.username);
    });
    this.route.params.subscribe(params => {
      if (params['orderId']) {
        this.orderId = params['orderId']
      }
    });

  }

  ngOnInit() {
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


}

