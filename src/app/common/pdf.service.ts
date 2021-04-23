import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  pdfMake: any;

  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(contentDefinition:any) {

    await this.loadPdfMaker();

    this.pdfMake.createPdf(contentDefinition).open();
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
