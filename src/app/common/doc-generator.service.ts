import { Injectable } from '@angular/core';
import * as JSZip from "jszip";
import {FileSaverService} from "ngx-filesaver";
import * as angularExpressions from "angular-expressions";

//declare let JSZipUtils: any;

export interface Window {
  docxtemplater: any;
  JSZipUtils: any;
}
declare let window: Window;
export class FileGeneratorHelper {
  data: any;
  templateName: any;
  outputName: any;
}


@Injectable({
  providedIn: 'root'
})
export class DocGeneratorService {

  constructor(private fileSaverService: FileSaverService) { }

  private loadFile(url,callback){
    window.JSZipUtils.getBinaryContent(url,callback);
  }

  generateFile(fileGeneratorHelper: FileGeneratorHelper) {
    let ctrl = this;
    this.loadFile("http://localhost:4200/assets/"+fileGeneratorHelper.templateName+".docx",function(error,content){
      if (error) { throw error }
      let zip = new JSZip(content);

      angularExpressions.filters.date = function(date) {
        // This condition should be used to make sure that if your input is undefined, your output will be undefined as well and will not throw an error
        if(!date) return date;
        return new Date(date).toLocaleDateString("en-US");

      };
      const angularParser = function(tag) {
        return {
          get: tag === '.' ? function(s){ return s;} : function(s) {
            return angularExpressions.compile(tag.replace(/(’|“|”)/g, "'"))(s);
          }
        };
      };

      let doc = new window.docxtemplater().loadZip(zip).setOptions({parser: angularParser});
      doc.setData(fileGeneratorHelper.data);
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      }
      catch (error) {
        let e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }
      let out=doc.getZip().generate({
        type:"blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      //Output the document using Data-URI
      ctrl.fileSaverService.save(out,fileGeneratorHelper.outputName+".docx")
    })
  }
}
