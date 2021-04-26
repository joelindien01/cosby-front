import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DeliveryNote, DeliveryNoteDTO, Item, PurchaseOrder} from "../purchase-order/PurchaseOrder";
import { environment } from '../../environments/environment';
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import {mergeMap} from "rxjs/operators";
import {PurchaseOrderService} from "../purchase-order/purchase-order.service";
import {PdfService} from "../common/pdf.service";
import {DatePipe} from "@angular/common";
import {BillService} from "../bill/bill.service";
import {isDefined} from "@angular/compiler/src/util";

export class DelNoteData{
  vessel: string;
  contact: string;
  yourRef: string;
  billTo: string;
  date: Date;
  port: string;
  deliveryNoteId;
  el: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  constructor(public billService: BillService, public datepipe: DatePipe, private pdfService: PdfService, private httpClient: HttpClient, private docGenerator: DocGeneratorService, private poService: PurchaseOrderService) { }

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"delivery-note/";

  saveDeliveryNote(deliveryNoteDTO: DeliveryNoteDTO): Observable<any> {
    return this.httpClient.post(this.baseUrl, deliveryNoteDTO);
  }

  getDeliveryNotesByCustomerId(customerId: number): Observable<Array<DeliveryNote>> {
    const params = new HttpParams({
      fromObject: {
        customerId: customerId.toString()
      }
    });
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"search", {params: params});
  }

  generateDeliveryNote(deliveryNoteId: number) {
    const params = new HttpParams({
      fromObject: {
        deliveryNoteId: deliveryNoteId.toString()
      }
    });
    let delNoteReturned: any ;
    this.findById(deliveryNoteId).pipe(
      mergeMap((delNote) => {
        delNoteReturned = delNote;
        return this.poService.findById(delNote.purchaseOrderId)
      }))
      .subscribe( poData => {
        const pdfDefinition = this.buildDeliveryNote(delNoteReturned, poData).then(value => {

          console.log(value);
          this.pdfService.generatePdf(value);
        });/*
        let docGeneratorHelper = new FileGeneratorHelper();
        docGeneratorHelper.outputName = "delivery_note"+
          "_"+delNoteReturned.id+ "_" +
          poData.customer.name+
          "_"+
          new Date().toISOString();
        docGeneratorHelper.templateName = "delivery_note";
        docGeneratorHelper.data = this.mapDelNote(delNoteReturned, poData);

        this.docGenerator.generateFile(docGeneratorHelper);*/


    });
  }

  sendDeliveryNoteByEmail(deliveryNoteId: number) {

  }

  findAll() {
    return this.httpClient.get<Array<DeliveryNote>>(this.baseUrl+"search");
  }

  findById(deliveryNoteId: number) {
    return this.httpClient.get<DeliveryNoteDTO>(this.baseUrl+deliveryNoteId);
  }

  findNotes(searchForm: any) {
    return this.httpClient.post<Array<DeliveryNote>>(this.baseUrl+"find", searchForm);
  }

  private mapDelNote(delNoteReturned: any, poData: PurchaseOrder) {
    let delNote = new DelNoteData();
    delNote.deliveryNoteId = delNoteReturned.id;
    delNote.port = poData.deliveryInformation.port;
    delNote.billTo = poData.customer.name;
    delNote.vessel = poData.deliveryInformation.vessel;
    delNote.contact = poData.customer.contacts[0].name;
    delNote.yourRef = poData.poNumber;
    delNote.date = delNoteReturned.deliveryDate;
    delNote.el = poData.itemList;
    return delNote;
  }
  async buildDeliveryNote(delNoteReturned: any, poData: PurchaseOrder) {



    let clientNameArea = {

      text: '',
      bold: true,
      color: '#333333',
      alignment: 'left',
      stack: [
        {text: poData.customer.name+(isDefined(poData.customer.description) ? '\n'+poData.customer.description : ''), fontSize: 9},
        {
          text: 'Billing Address',
          color: '#aaaaab',
          bold: true,
          fontSize: 10,
          alignment: 'left',
          margin: [0, 10, 0, 5],
        },{
          text: this.billService.buildBillingAddress(poData.customer.billingAddress),
          fontSize: 9
        }]
    };
    let bankIbanAccountReferenceArea = [
      {text: ''}];
    let holderSwiftRibArea = [
      {text: ''}
    ];
    let clientSignatoryNameArea = {
      text: delNoteReturned.customerSignatory,
      style:'signatureName'
    };
    let clientSignatoryJobTitleArea = {
      text: delNoteReturned.customerSignatoryFunction,
      style:'signatureJobTitle'

    };
    let ourSignatoryFunctionArea = {
      text: delNoteReturned.ourSignatory,
      style:'signatureName'

    };
    let ourSignatoryJobTitleArea = {
      text: delNoteReturned.ourSignatoryFunction,
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

    let tableArea = this.buildTableArea(poData);
    let buildTableAnnexe = this.buildTableAnnexe(poData);
    let invoiceDateArea = this.buildInvoiceDateArea(delNoteReturned, poData);
    let deliveryInfoArea = this.buildDeliveryInfoArea(delNoteReturned, poData);
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
              fontSize: 10,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            },
            {
              text: 'Delivery Info',
              color: '#aaaaab',
              bold: true,
              fontSize: 10,
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
            widths: ['auto', '*','auto','auto'],
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
            heights: 10,
            body: buildTableAnnexe,
          },
        },
        '\n',
        {text:''},
        '\n',
        {unbreakable: true,
          columns: [
            {
              stack: bankIbanAccountReferenceArea,
              width: '70%',
              alignment:'left'
            },
            {
              stack: holderSwiftRibArea,
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
                  text: '_________________________________',
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
                  text: '_________________________________',
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
        },

      ],
      pageMargins: [40, 110, 40, 80],
      header: {
        columns: [
          { image: logoImagePath,
            alignment: 'left',
            width: 150,
            margin: [40,20,0,10],
          },
          [
            {
              text: 'Delivery Note '+delNoteReturned.id.toString(),
              color: '#333333',
              width: '*',
              fontSize: 20,
              bold: true,
              alignment: 'right',
              margin: [0, 20, 40, 0],
            }]
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

  private buildTableAnnexe(poData: PurchaseOrder) {
    return [[]];
  }

  private buildDeliveryInfoArea(delNoteReturned: any, poData: PurchaseOrder) {
    return "Port: " + poData.deliveryInformation.port + "\n" +
      "Vessel: " + poData.deliveryInformation.vessel;
  }

  private buildInvoiceDateArea(delNoteReturned: any, poData: PurchaseOrder) {
    const invoiceDateAreaElementValues = [
      {name: "Your Ref", value: poData.poNumber},
      {name: "Issue Date", value: this.datepipe.transform(delNoteReturned.creationDate, 'MMMM d, y')},
      {name: "Delivery Date", value: this.datepipe.transform(delNoteReturned.deliveryDate, 'MMMM d, y')},
      {name: "Contact Person", value: poData.contactInfo.name}
    ];
    return invoiceDateAreaElementValues.map(value => {
      return {
        columns: [
          {
            text: value.name,
            color: '#aaaaab',
            bold: true,
            width: '*',
            fontSize: 9,
            alignment: 'right',
          },
          {
            text: value.value,
            bold: true,
            color: '#333333',
            fontSize: 9,
            alignment: 'right',
            width: 100,
          },
        ],
      };
    });
  }

  private buildProduct(item: Item, index: number) {
    const product = [index.toString(), item.description, item.quantity.toString(), item.unitOfMeasurement.symbol];
    return product.map(p => {
      return {
        text: p,
        border: [false, false, false, true],
        fontSize: 8,
        margin: [0, 1, 0, 1],
        alignment: 'left',
      }
    });
  }

  private buildTableHeader() {
    const columns = ["N°", "Description", "Quantity", "Unit"];
    return columns.map( column => {
      return {
        text: column,
        fillColor: '#eaf2f5',
        fontSize: 9,
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      }
    });
  }

  private buildTableArea(poData: PurchaseOrder) {
    let tableArea = [];
    tableArea.push(this.buildTableHeader());
    poData.itemList.forEach((item, index) => {
      const productRow = this.buildProduct(item, index+1);
      tableArea.push(productRow);
    });
    return tableArea;
  }
}


