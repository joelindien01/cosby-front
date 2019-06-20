import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../customer/customer";

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss']
})
export class ViewAddressComponent implements OnInit {

  @Input() title: string;
  @Input() address: Address;

  constructor() { }

  ngOnInit() {
  }

}
