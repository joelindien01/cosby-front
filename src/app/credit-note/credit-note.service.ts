import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Bill, BillDTO} from "../bill/bill";
import {DocGeneratorService, FileGeneratorHelper} from "../common/doc-generator.service";
import {DatePipe} from "@angular/common";
import {isDefined} from "@angular/compiler/src/util";
import {PdfService} from "../common/pdf.service";
export class CreditNote {
  id: number;
  creationDate: Date;
  creditedAmount: number;
  netToBeDeducted: number;
}
@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"credit-note/";

  constructor(private pdfService: PdfService, private httpClient: HttpClient, private docGenerator: DocGeneratorService, public datepipe: DatePipe) { }

  saveCreditNote(creditNote: CreditNote) {
    return this.httpClient.post(this.baseUrl, creditNote);
  }

  generateCreditNote(cn: CreditNoteDocData) {
    /*let docGeneratorHelper = new FileGeneratorHelper();
    docGeneratorHelper.outputName = "credit_note"+
      "_"+cn.id+ "_" +
      new Date().toISOString();
    docGeneratorHelper.templateName = "credit_note";
    docGeneratorHelper.data = cn;

    this.docGenerator.generateFile(docGeneratorHelper);*/
    const pdfDefinition = this.buildCreditNote(cn).then(value => {

      console.log(value);
      this.pdfService.generatePdf(value);
    });

  }

  async buildCreditNote(creditNoteData: CreditNoteDocData) {


    let clientNameArea = {
      text: "",
      bold: true,
      color: '#333333',
      alignment: 'left',
    };
    let bankIbanAccountReferenceArea = [
      {text: ''}];
    let holderSwiftRibArea = [
      {text: ''}
    ];
    let clientSignatoryNameArea = {text: ''
    };
    let clientSignatoryJobTitleArea = {
      text: ''
    };
    let ourSignatoryFunctionArea = {
      text: ''
    };
    let ourSignatoryJobTitleArea = {
      text: ''
    };
    let footerImagePath = await this.pdfService.getBase64ImageFromURL(
      "/assets/footer.jpg"
      )
    ;
    let logoImagePath = await this.pdfService.getBase64ImageFromURL(
      "/assets/logo_lobo.jpg"
      )
    ;
    let tableArea = this.buildTableArea(creditNoteData);
    let buildTableAnnexe = this.buildTableAnnexe(creditNoteData);
    let invoiceDateArea = this.buildInvoiceDateArea(creditNoteData);
    let deliveryInfoArea = this.buildDeliveryInfoArea(creditNoteData);
    return {
      content: [
        {
          columns: [
            {
              image: logoImagePath,
              width: 150,
            },
            [
              {
                text: 'Credit Note',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: invoiceDateArea,
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: '',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            },
            {
              text: '',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
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
            widths: ['*', 'auto'],
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
        },

      ],
      pageMargins: [40, 30, 40, 60],
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

  private buildAnnexeRow(areaName: string,text: string, fontSize?:number) {
    let areaNameEL: any = {
      text: areaName,
      border: [false, true, false, true],
      alignment: 'right',
      margin: [0, 5, 0, 5],
    };
    if(isDefined(fontSize)) {
      areaNameEL.fontSize = fontSize;
    }
    return [
      areaNameEL,
      {
        border: [false, true, false, true],
        text: text,
        alignment: 'right',
        fillColor: '#f5f5f5',
        margin: [0, 5, 0, 5],
      },
    ]
  }

  private buildTableAnnexe(creditNoteData: CreditNoteDocData) {
    return [this.buildAnnexeRow("NET TO BE DEDUCTED", creditNoteData.netToBeDeducted.toString(), 20)];
  }

  private buildDeliveryInfoArea(creditNoteData: CreditNoteDocData) {
    return "";
  }

  private buildInvoiceDateArea(creditNoteData: CreditNoteDocData) {
    const invoiceDateAreaElementValues = [
      {name: "Credit Note N°", value: creditNoteData.id.toString()},
      {name: "Issue Date", value: this.datepipe.transform(creditNoteData.creationDate, 'MMMM d, y')},
      {name: "Vessel", value: creditNoteData.vessel}
    ];
    return invoiceDateAreaElementValues.map(value => {
      return {
        columns: [
          {
            text: value.name,
            color: '#aaaaab',
            bold: true,
            width: '*',
            fontSize: 12,
            alignment: 'right',
          },
          {
            text: value.value,
            bold: true,
            color: '#333333',
            fontSize: 12,
            alignment: 'right',
            width: 100,
          },
        ],
      };
    });
  }

  private buildProduct(creditNoteData: CreditNoteDocData) {
    const product = ["Credit on invoice n° : " +creditNoteData.billId.toString(), creditNoteData.creditedAmount];
    return product.map(p => {
      return {
        text: p,
        border: [false, false, false, true],
        fontSize: 10,
        margin: [0, 5, 0, 5],
        alignment: 'left',
      }
    });
  }

  private buildTableHeader() {
    const columns = ["Description", "Amount"];
    return columns.map( column => {
      return {
        text: column,
        fillColor: '#eaf2f5',
        fontSize: 10,
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      }
    });
  }

  private buildTableArea(creditNoteData: CreditNoteDocData) {
    let tableArea = [];
    tableArea.push(this.buildTableHeader());
    tableArea.push(this.buildProduct(creditNoteData));
    return tableArea;
  }

}
export class CreditNoteDocData {
  vessel: string;
  creationDate: Date;
  id: number;
  billId: number;
  creditedAmount: number;
  netToBeDeducted: number;
}
