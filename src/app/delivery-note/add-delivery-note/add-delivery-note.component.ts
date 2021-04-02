import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {DeliveryNoteDTO} from "../../purchase-order/PurchaseOrder";
import {startWith} from "rxjs/internal/operators";
import {MyErrorStateMatcher} from "../../common/multi-addable-form";

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

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private deliveryNoteService: DeliveryNoteService,
              private router: Router) {
    this.matcher = new MyErrorStateMatcher();
    this.deliveryNoteForm = this.fb.group({
      deliveryDate: new FormControl(new Date(), Validators.required),

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

