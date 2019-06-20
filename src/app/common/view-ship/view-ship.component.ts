import {Component, Input, OnInit} from '@angular/core';
import {DeliveryInformation} from "../../customer/customer";

@Component({
  selector: 'app-view-ship',
  templateUrl: './view-ship.component.html',
  styleUrls: ['./view-ship.component.scss']
})
export class ViewShipComponent implements OnInit {

  @Input() ship: DeliveryInformation;
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
