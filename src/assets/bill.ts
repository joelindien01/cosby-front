// try here http://pdfmake.org/playground.html
export class BillTemplate {

  constructor() {
  }

  buildBill() {

    let receiptNumberArea = {
      text: '00001',
      bold: true,
      color: '#333333',
      fontSize: 12,
      alignment: 'right',
      width: 100,
    };
    let issueDateArea = {
      text: 'June 01, 2021',
      bold: true,
      color: '#333333',
      fontSize: 12,
      alignment: 'right',
      width: 100,
    };
    let statusArea = {
      text: 'PAID',
      bold: true,
      fontSize: 14,
      alignment: 'right',
      color: 'green',
      width: 100,
    };
    let companyNameArea = {
      text: 'AVINATO',
      bold: true,
      color: '#333333',
      alignment: 'left',
    };
    let clientNameArea = {
      text: '${client}',
      bold: true,
      color: '#333333',
      alignment: 'left',
    };
    let clientBillingAddress = {
      text: '${customerBillingAddress}',
      style: 'invoiceBillingAddress',
    };
    let product1 = [
      {
        text: '1',
        border: [false, false, false, true],
        margin: [0, 5, 0, 5],
        alignment: 'left',
      },
      {
        text: 'Tomato',
        border: [false, false, false, true],
        margin: [0, 5, 0, 5],
        alignment: 'left',
      },
      {
        text: '1',
        border: [false, false, false, true],
        margin: [0, 5, 0, 5],
        alignment: 'left',
      },
      {
        text: 'kg',
        border: [false, false, false, true],
        margin: [0, 5, 0, 5],
        alignment: 'left',
      },
      {
        text: '10',
        border: [false, false, false, true],
        margin: [0, 5, 0, 5],
        alignment: 'left',
      },
      {
        border: [false, false, false, true],
        text: '10',
        fillColor: '#f5f5f5',
        alignment: 'right',
        margin: [0, 5, 0, 5],
      },
    ];
    let subTotalArea = {
      border: [false, true, false, true],
      text: '10',
      alignment: 'right',
      fillColor: '#f5f5f5',
      margin: [0, 5, 0, 5],
    };
    let transportationFeeArea = {
      text: '30',
      border: [false, false, false, true],
      fillColor: '#f5f5f5',
      alignment: 'right',
      margin: [0, 5, 0, 5],
    };
    let deliveryFeeArea = {
      text: '20',
      border: [false, false, false, true],
      fillColor: '#f5f5f5',
      alignment: 'right',
      margin: [0, 5, 0, 5],
    };
    let discountArea = {
      text: '0',
      border: [false, false, false, true],
      fillColor: '#f5f5f5',
      alignment: 'right',
      margin: [0, 5, 0, 5],
    };
    let totalAmountArea = {
      text: '70 F CFA',
      bold: true,
      fontSize: 20,
      alignment: 'right',
      border: [false, false, false, true],
      fillColor: '#f5f5f5',
      margin: [0, 5, 0, 5],
    };
    let bankIbanAccountReferenceArea = [
      {
        text: 'Bank: BANQUE ATLANTIQUE TOGO',

      },
      {
        text: 'IBAN: TG53 TG13 8010 1004 3201 1900 3014'
      },
      {
        text: 'Account N°: 043201190030'

      }
    ];
    let holderSwiftRibArea = [
      {
        text: 'Holder: STE AVINATO SARL',


      },
      {
        text: 'SWIFT Code: ATTGTGTGXXX'
      },
      {
        text: 'RIB: 12'

      }
    ];
    let clientSignatoryNameArea = {
      text: 'Client signatory',
      style:'signatureName'

    };
    let clientSignatoryJobTitleArea = {
      text: 'job title',
      style:'signatureJobTitle'

    };
    let ourSignatoryFunctionArea = {
      text: 'Our Signatory',
      style:'signatureName'

    };
    let ourSignatoryJobTitleArea = {
      text: 'job title',
      style:'signatureJobTitle'

    };
    let footerImagePath = '';
    let logoImagePath = '';
    let tableHeaderArea = [
      {
        text: 'N°',
        fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
      {
        text: 'Description',
        fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
      {
        text: 'Quantity',
        fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
      {
        text: 'Unit',
        fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
      {
        text: 'Price',
        fillColor: '#eaf2f5',
        border: [false, true, false, true],
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
      {
        text: 'Amount',
        border: [false, true, false, true],
        alignment: 'right',
        fillColor: '#eaf2f5',
        margin: [0, 5, 0, 5],
        textTransform: 'uppercase',
      },
    ];
    let tableArea = [
      tableHeaderArea,
      product1
    ];
    let dd =  {
      content: [
        {
          columns: [
            {
              image: logoImagePath,
              width: 150,
            },
            [
              {
                text: 'Invoice',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Receipt No.',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      receiptNumberArea,
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Issue Date',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      issueDateArea,
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Status',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      statusArea,
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'From',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            },
            {
              text: 'To',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 10, 0, 5],
            },
          ],
        },
        {
          columns: [
            clientNameArea,
          ],
        },
        {
          columns: [
            {
              text: 'Address',
              color: '#aaaaab',
              bold: true,
              margin: [0, 5, 0, 3],
            }
          ],
        },
        {
          columns: [
            clientBillingAddress,
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
            body: [
              [
                {
                  text: 'Subtotal',
                  border: [false, true, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                subTotalArea,
              ],
              [
                {
                  text: 'Transportation Fee',
                  border: [false, false, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                transportationFeeArea,
              ],
              [
                {
                  text: 'Delivery Fee',
                  border: [false, false, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                deliveryFeeArea,
              ],
              [
                {
                  text: 'Discount',
                  border: [false, false, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                discountArea,
              ],
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                },
                totalAmountArea,
              ],
            ],
          },
        },
        '\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'Payment Information',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
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
    return dd;
  }
}
