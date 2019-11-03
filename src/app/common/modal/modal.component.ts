import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() contentId: number;
  @Input() withFooter: boolean;
  @Output() modalSaved = new EventEmitter<void>();
  @Input() modalType: string;

  constructor() { }

  ngOnInit() {
    this.modalType = this.modalType == undefined ? "modal-dialog-centered" : this.modalType;
  }

  onModalSaved() {
    this.modalSaved.emit();
  }
}
