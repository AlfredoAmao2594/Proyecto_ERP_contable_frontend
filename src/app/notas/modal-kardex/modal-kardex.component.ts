import { Component, Inject, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NotaDto, NotaReporte } from '../models/nota-dto';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-kardex',
  templateUrl: './modal-kardex.component.html',
  styleUrl: './modal-kardex.component.scss'
})
export class ModalKardexComponent implements OnInit {

  public loading = false;
  dataList: NotaReporte[] = [];
  displayedColumns = ['idProducto', 'detalleProducto', 'cantidad', 'importeTotal', 'precio'];

  constructor(
    private serviceNotas:NotasService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalKardexComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotaReporte,
    private http: HttpClient
    
  ){}

  ngOnInit(): void{
    this.getAllData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceNotas.getReportNote()
      .subscribe(
        res => {
          this.dataList = res;
          this.loading = false;
        },
        err => {
          this.loading = false;
         
        }
      );
  }

  generarReporte(): void {
    this.serviceNotas.generarReport().subscribe(
      (blob) => {
        const blobUrl = URL.createObjectURL(blob);
  
        // Crear un objeto de tipo Blob
        const blobObject = new Blob([blob], { type: 'text/plain' });
  
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Kardex.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
  
        Swal.fire({
          icon: 'success',
          title: 'Reporte generado',
        });
      },
      (error) => {
        console.error('Error al generar el reporte:', error);
  
        // Maneja los errores
        Swal.fire({
          icon: 'error',
          title: 'Error al generar el reporte',
          text: `Error: ${error.message}`,
        });
      }
    );
    }

   
}
