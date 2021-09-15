import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import {ElementRef} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class Utils {
  static exportReportPDF(content: ElementRef, nameFile: string): void {
    const doc = new jsPDF();
    // get table html
    const pdfTable = content.nativeElement;
    // html to pdf format
    const html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {content: html};

    pdfMake.createPdf(documentDefinition).open();
  }

  static exportTableReportXLSX(content: ElementRef, nameFile: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(content.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, nameFile + '.xlsx');
  }

  static exportDataReportXLSX(content: any, nameFile: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(content);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, nameFile + '.xlsx');
  }
}
