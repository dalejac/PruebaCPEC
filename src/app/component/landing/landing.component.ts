import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

type AOA = any[][];

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  data1: AOA = [ [1, 2], [3, 4] ];
  data2: AOA = [ [1, 2], [3, 4] ];
  data3: AOA = [ [1, 2], [3, 4] ];
  show = false;
  nivel = ['En el Territorio Nacional']
  
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    /* Lector de archivo */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* Leer acrchivo */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* Tomar la primer hoja */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const wsname2: string = wb.SheetNames[1];
      const ws2: XLSX.WorkSheet = wb.Sheets[wsname2];

      const wsname3: string = wb.SheetNames[2];
      const ws3: XLSX.WorkSheet = wb.Sheets[wsname3];

      /* guardar la data */
      this.data1 = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.data2 = <any>(XLSX.utils.sheet_to_json(ws2, { header: 1 }));

      this.data3 = <any>(XLSX.utils.sheet_to_json(ws3, { header: 1 }));
      console.log(this.data2);
      console.log(this.data3);
    };
    reader.readAsBinaryString(target.files[0])
  }

  mostrar() {
    this.show =! this.show;
  }

  /* Intento de leer el archivo localmente 
  getData() { 
    const wb1: XLSX.WorkBook = XLSX.read('../../../assets/base-ANT.xlsx', {type: 'array', raw: true});
    // const wsname: string = wb1.SheetNames[0];
    const ws: XLSX.WorkSheet = wb1.Sheets[wb1.SheetNames[0]];

    const wb2: XLSX.WorkBook = XLSX.read('../../../assets/base-PDET.xlsx');
    // const wsname2: string = wb2.SheetNames[0];
    const ws2: XLSX.WorkSheet = wb2.Sheets[wb2.SheetNames[0]];

    const wb3: XLSX.WorkBook = XLSX.read('../../../assets/base-URT.xlsx');
    // const wsname3: string = wb3.SheetNames[0];
    const ws3: XLSX.WorkSheet = wb3.Sheets[wb3.SheetNames[0]];

    this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    console.log(this.data);
  }*/
} 
