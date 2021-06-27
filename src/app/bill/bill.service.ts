import {Inject, Injectable} from '@angular/core';
import {Account, Bill, BillDTO} from "./bill";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import { environment } from '../../environments/environment';
import {Item, ItemDto} from "../purchase-order/PurchaseOrder";
import {PdfService} from "../common/pdf.service";
import {DatePipe, DecimalPipe} from '@angular/common'
import {Address} from "../customer/customer";
import {isDefined} from "@angular/compiler/src/util";
import {MatDialog} from "@angular/material";
import {AddCreditNoteComponent} from "../credit-note/add-credit-note/add-credit-note.component";
import {isUndefined} from "util";


export class BillData {
  vessel: string;
  contactPersonName: string;
  yourRef: string;
  billTo: string;
  creationDate: Date;
  port: string;
  deadLine: Date;
  deliveryNoteId: string;
  billId: string;
  deliveryFee: string;
  transportationFee: string;
  subTotal: number;
  discount: string;
  netTotal: string;
  el: Item[];
  impactedAccount: Account;
  ourSignatoryFunction: string;
  ourSignatory: string;
}


@Injectable({
  providedIn: 'root'
})
export class BillService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"bill/";
  bill: any;

  constructor(public dialog: MatDialog, private httpClient: HttpClient,
              private docGenerator: DocGeneratorService, private pdfService: PdfService, public datepipe: DatePipe, public numberPipe: DecimalPipe) {}

  saveBill(bill: BillDTO) {
    return this.httpClient.post(this.baseUrl, bill);
  }

  createCreditNote(currentBillId: any) {
    const dialogRef = this.dialog.open(AddCreditNoteComponent, {
      width: '250px',
      data: {billId: currentBillId}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('Th');
    });
  }

  getBillsByCustomerId(customerId: number): Observable<Array<Bill>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<Bill>>(this.baseUrl+"search", {params: params});
  }

  generateBill(billId: number) {
    const params = new HttpParams({
      fromObject: {
        billId: billId.toString()
      }
    });
    this.httpClient
      .get<Bill>(this.baseUrl+"generate", {params: params})
      .subscribe(billData => {
        const pdfDefinition = this.buildBill(<Bill>billData).then(value => {

          console.log(value);
          this.pdfService.generatePdf(value);
        });
    });
  }

  sendBillByEmail(billId: number) {

  }

  findAll() {
    return this.httpClient.get<Array<Bill>>(this.baseUrl+"search");
  }

  findBillById(billId: number): Observable<BillDTO> {
    return this.httpClient.get<BillDTO>(this.baseUrl+billId);
  }

  findbills(searchForm: any) {
    return this.httpClient.post<Array<Bill>>(this.baseUrl+"search", searchForm);
  }

  private mapBillData(bill: Bill) {
    let billData: BillData = new BillData();

    billData.contactPersonName = bill.deliveryNote.purchaseOrder.customer.contacts[0].name;
    billData.yourRef = bill.deliveryNote.purchaseOrder.poNumber;
    billData.billTo = bill.deliveryNote.purchaseOrder.customer.name;
    billData.creationDate = bill.creationDate;
    billData.port = bill.deliveryNote.purchaseOrder.deliveryInformation.port;
    billData.vessel = bill.deliveryNote.purchaseOrder.deliveryInformation.vessel;
    billData.deadLine = bill.deadLine;
    billData.deliveryNoteId = bill.deliveryNote.id.toString();
    billData.el = bill.deliveryNote.purchaseOrder.itemList;
    billData.deliveryFee = bill.deliveryFee.toString();
    billData.transportationFee = bill.transportationFee.toString();
    billData.subTotal = bill.deliveryNote.purchaseOrder.totalAmount;
    billData.netTotal = bill.netTotal.toString();
    billData.discount = bill.discount.toString();
    billData.impactedAccount = bill.impactedAccount;
    billData.ourSignatory = bill.ourSignatory;
    billData.ourSignatoryFunction = bill.ourSignatoryFunction;
    billData.billId = bill.id.toString();

    return billData;
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  async buildBill(bill: Bill) {


    let clientNameArea = {

      text: '',
      bold: true,
      color: '#333333',
      alignment: 'left',
      stack: [
        {text: bill.deliveryNote.purchaseOrder.customer.name+(isDefined(bill.deliveryNote.purchaseOrder.customer.description) ? '\n'+bill.deliveryNote.purchaseOrder.customer.description : ''), fontSize: 9},
        {
          text: 'Billing Address',
          color: '#aaaaab',
          bold: true,
          fontSize: 10,
          alignment: 'left',
          margin: [0, 10, 0, 5],
        },{
          text: this.buildBillingAddress(bill.deliveryNote.purchaseOrder.customer.billingAddress),
          fontSize: 9
        }]
    };
    let bankIbanAccountReferenceArea = [
      {text: 'Bank: '+ (isUndefined(bill.impactedAccount) || bill.impactedAccount == null ? "":bill.impactedAccount.bankName), fontSize: 9},
      {text: 'Account N°: '+ (isUndefined(bill.impactedAccount) || bill.impactedAccount == null? "":bill.impactedAccount.reference), fontSize: 9},
      {text: 'IBAN: ' + (isUndefined(bill.impactedAccount) || bill.impactedAccount == null? "":bill.impactedAccount.iban), fontSize: 9}];
    let holderSwiftRibArea = [
      {text: 'Holder: '+ (isUndefined(bill.impactedAccount) || bill.impactedAccount == null? "":bill.impactedAccount.holder), fontSize: 9},
      {text: 'SWIFT Code: '+ (isUndefined(bill.impactedAccount) || bill.impactedAccount == null? "":bill.impactedAccount.swiftCode), fontSize: 9},
      {text: 'RIB: '+ (isUndefined(bill.impactedAccount) || bill.impactedAccount == null? "":bill.impactedAccount.rib), fontSize: 9}
    ];
    let clientSignatoryNameArea = {
      text: isDefined(bill.customerSignatory) && bill.customerSignatory.length > 0 ? bill.customerSignatory : '\n',

      style:'signatureName'
    };
    let clientSignatoryJobTitleArea = {
      text: bill.customerSignatoryFunction,
      style:'signatureJobTitle'

    };
    let ourSignatoryFunctionArea = {
      text: isDefined(bill.ourSignatory) && bill.ourSignatory.length > 0 ? bill.ourSignatory : '\n',
      style:'signatureName'

    };
    let ourSignatoryJobTitleArea = {
      text: bill.ourSignatoryFunction,
      style:'signatureJobTitle'
    };
    let footerImagePath = await this.pdfService.getBase64ImageFromURL(
      "/assets/footer.jpg"
      )
    ;
    let logoImagePath = await this.pdfService.getBase64ImageFromURL(
      "/assets/logo_lobo.jpg"
    )
    ;

    let billHead = this.pdfService.buildId(bill, "Invoice ", "FE");
    let tableArea = this.buildTableArea(bill);
    let buildTableAnnexe = this.buildTableAnnexe(bill, true);
    let invoiceDateArea = this.buildInvoiceDateArea(bill);
    let deliveryInfoArea = this.buildDeliveryInfoArea(bill);
    return {
      content: [
        {
          columns: [
            [
              {
                stack: invoiceDateArea,
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'To',
              color: '#aaaaab',
              bold: true,
              fontSize: 11,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            },
            {
              text: 'Delivery Info',
              color: '#aaaaab',
              bold: true,
              fontSize: 11,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            }
          ],
        },
        {
          columns: [
            clientNameArea,
            {
              text: deliveryInfoArea,
              bold: true,
              color: '#333333',
              alignment: 'left',
              fontSize: 9
            }
          ],
        },
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            heights: 8,
            widths: ['auto', '*','auto','auto','auto','auto'],
            body: tableArea,
          },
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 3;
            },
            paddingBottom: function(i, node) {
              return 3;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            heights: 8,
            body: buildTableAnnexe,
          },

          unbreakable: true,
        },
        '\n',
        {
          stack: [

          {
            width: '100%',
            alignment: 'center',
            text: isDefined(bill.impactedAccount)? 'Payment Information' : "",
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 11,
          },
            {unbreakable: true,
              columns: [
                {
                  stack: isDefined(bill.impactedAccount)? bankIbanAccountReferenceArea : [],
                  width: '70%',
                  alignment:'left'
                },
                {
                  stack: isDefined(bill.impactedAccount)? holderSwiftRibArea : [],
                  width: 180,
                  alignment:'left'
                },

              ],
              columnGap: 10
            },
            // Signature
            {
              unbreakable: true,
              columns: [
                {
                  stack: [
                    {
                      text: '',
                      style:'signaturePlaceholder'
                    },
                    clientSignatoryNameArea,
                    clientSignatoryJobTitleArea
                  ],
                  width: 180,
                  alignment:'left'
                },
                {
                  stack: [
                    {
                      text: '',
                      style:'signaturePlaceholder'
                    },
                    ourSignatoryFunctionArea,
                    ourSignatoryJobTitleArea
                  ],
                  width: 180,
                  alignment:'right'
                },

              ],
              columnGap: 150
            }

            ],
          unbreakable: true,
        }
      ],
      pageMargins: [40, 110, 40, 80],
      /*header: {
        columns: [
          { image: logoImagePath,
            alignment: 'left',
            width: 150,
            margin: [40,20,0,60],
          },
          [
            {
              text: this.pdfService.buildId(bill, "Invoice ", "FE"),
              color: '#333333',
              width: '*',
              fontSize: 20,
              bold: true,
              alignment: 'right',
              margin: [0, 20, 40, 0],
            }]
        ]

      },*/
      header: function(currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element


        return [
          {
            columns: [
              { image: logoImagePath,
                alignment: 'left',
                width: 150,
                margin: [40,20,0,10],
              },
              [{
                text: 'Page: ' + currentPage + '/' + pageCount,
                color: '#333333',
                width: '*',
                fontSize: 9,
                bold: false,
                alignment: 'right',
                margin: [0, 20, 40, 0],
              },
                {
                  text: billHead,
                  color: '#333333',
                  width: '*',
                  fontSize: 20,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 20, 40, 0],
                }]
            ]

          },
          //{ text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
          { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
        ]
      },
      footer: {
        columns: [
          { image: footerImagePath,
            alignment: 'left',
            width: 520,
            margin: [40,0,0,0],
          }
        ]
      },
      styles: {
        signaturePlaceholder: {
          margin: [0,70,0,0],
        },
        signatureName: {
          bold: true,
          alignment:'center',
        },
        signatureJobTitle: {
          italics: true,
          fontSize: 10,
          alignment:'center',
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 10,
        //font: 'Quicksand',
      },
    };
  }

  private buildDeliveryInfoArea(bill: Bill) {
    return this.pdfService.buildId(bill.deliveryNote, "Delivery Note Ref: ", "DN")+ "\n" +
      "Port: " + bill.deliveryNote.purchaseOrder.deliveryInformation.port + "\n" +
      "Vessel: " + bill.deliveryNote.purchaseOrder.deliveryInformation.vessel;
  }

  private buildInvoiceDateArea(bill: Bill) {

    let invoiceDateAreaElementValues = [
      {name: "Issue Date", value: this.datepipe.transform(bill.issueDate, 'MMMM d, y')},
      {name: "Due Date", value: this.datepipe.transform(bill.deadLine, 'MMMM d, y')},
      {name: "Contact Person", value: bill.deliveryNote.purchaseOrder.contactInfo.name}];
    if(isDefined(bill.deliveryNote.purchaseOrder.poNumber)) {
      invoiceDateAreaElementValues.push({name: "Your Ref", value: bill.deliveryNote.purchaseOrder.poNumber})
    }
    return invoiceDateAreaElementValues.map(value => {
      return {
        columns: [
          {
            text: value.name,
            color: '#aaaaab',
            bold: true,
            width: '*',
            fontSize: 10,
            alignment: 'right',
          },
          {
            text: value.value,
            bold: true,
            color: '#333333',
            fontSize: 10,
            alignment: 'right',
            width: 100,
          },
        ],
      };
    });
  }

  private buildTableArea(bill: Bill) {
    let tableArea = [];
    tableArea.push(this.buildTableHeader());
    let itemList = bill.deliveryNote.purchaseOrder.itemList;
    itemList = itemList.sort(this.comparePosition);
      itemList.forEach((item, index) => {
      const productRow = this.buildProduct(item, index+1);
      tableArea.push(productRow);
    });
    return tableArea;
  }
  comparePosition(a, b) {

    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  }

  private buildTableAnnexe(bill: Bill, withAnnexe?:boolean) {
    if(!withAnnexe) {
      return [[]];
    }
    let tableAnnexe = [];

    if(bill.deliveryNote.purchaseOrder.totalAmount != bill.netTotal) {
      tableAnnexe.push({name: "subtotal", value: this.numberPipe.transform(bill.deliveryNote.purchaseOrder.totalAmount, '1.0-2', 'fr-FR')});
    }
    if(isDefined(bill.discount)) {
      const discount = bill.deliveryNote.purchaseOrder.totalAmount* (bill.discount)/100;
      tableAnnexe.push({name: "Discount " + bill.discount + "%", value: this.numberPipe.transform(discount, '1.0-2', 'fr-FR')});
    }
    tableAnnexe.push({name: "Transportation Fee", value: this.numberPipe.transform(bill.transportationFee , '1.0-2', 'fr-FR')});
    tableAnnexe.push({name: "Delivery Fee", value: this.numberPipe.transform(bill.deliveryFee, '1.0-2', 'fr-FR')});

    let returnedAnnexe = tableAnnexe.filter(el => isDefined(el.value) && el.value != 0).map(el => {
      return this.buildAnnexeRow(el.name, el.value.toString(), 9)
    });
    returnedAnnexe.push(this.buildAnnexeRow("Total Amount", this.numberPipe.transform(bill.netTotal, '1.0-2', 'fr-FR')+ " " + bill.deliveryNote.purchaseOrder.paymentInformation.currency.symbol, 9));
    return returnedAnnexe;
  }

  private buildProduct(item: Item, index: number) {
    const uom = isDefined(item.unitOfMeasurement) ? item.unitOfMeasurement.symbol : "";
    const product = [{label:index.toString(), alignment: "right" }, {label:item.description, alignment: "left" }, {label:this.numberPipe.transform(item.quantity, '1.0-2', 'fr-FR'), alignment: "right" }, {label:uom, alignment: "left" }, {label:this.numberPipe.transform(item.unit, '1.0-2', 'fr-FR'), alignment: "right" }, {label:this.numberPipe.transform(item.amount, '1.0-2', 'fr-FR'), alignment: "right" }];
    return product.map(p => {
      return {
        text: p.label,
        border: [false, false, false, true],
        fontSize: 8,
        margin: [0, 1, 0, 1],
        alignment: p.alignment,
      }
    });
  }

  private buildTableHeader() {
    const columns = [{label:"N°", alignment: "right" }, {label:"Description", alignment: "left" }, {label:"Quantity", alignment: "right" }, {label:"Unit", alignment: "left" }, {label:"Price", alignment: "right" }, {label:"Amount", alignment: "right" }];
    return columns.map( column => {
      return {
        text: column.label,
        fillColor: '#eaf2f5',
        fontSize: 9,
        border: [false, true, false, true],
        alignment: column.alignment,
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      }
    });
  }

  private buildAnnexeRow(areaName: string,text: string, fontSize?:number) {
    let areaNameEL: any = {
      text: areaName,
      border: [false, true, false, true],
      alignment: 'right',
      margin: [0, 2, 0, 2],
    };
    if(isDefined(fontSize)) {
      areaNameEL.fontSize = fontSize;
    }
    //totalAmountArea
    return [
      areaNameEL,
      {
        border: [false, true, false, true],
        text: text,
        alignment: 'right',
        fillColor: '#f5f5f5',
        margin: [0, 2, 0, 2],
        fontSize: fontSize
      },
    ]
  }

  public buildBillingAddress(address: Address) {
    return address.street + "\n"
      + address.zipCode +" "+ address.city + "\n"
      + address.state + "\n"
      + address.country;
  }
}

