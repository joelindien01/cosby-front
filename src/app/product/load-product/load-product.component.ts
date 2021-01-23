import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss']
})
export class LoadProductComponent implements OnInit {

  afuConfig = {
    multiple: true,
    formatsAllowed: ".xlsx",
    maxSize: "20",
    uploadAPI:  {
      method:"POST",
      url: ''
      /*headers: {
        "Content-Type" : "text/plain;charset=UTF-8",
        "Authorization" : `Bearer ${token}`
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',*/
    },

    /*theme: "dragNDrop",
    hideProgressBar: true,
hideResetBtn: true,
    hideSelectBtn: false,
    hideSelectBtn: true,
    fileNameIndex: true,*/
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(private productService: ProductService) {
    this.afuConfig.uploadAPI.url = this.productService.getProductLoadUrl();
  }

  ngOnInit() {
  }

}
