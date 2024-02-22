import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PorductosDto, Producto } from './model/producto-dto';
import { ProductosService } from './productos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

class FormFields{
  get Detalle(): string { return 'Detalle'; }
  get Marca(): string { return 'Marca'}
}

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrl: './modal-productos.component.scss'
})
export class ModalProductosComponent implements OnInit{

  public loading = false;
  dataList: PorductosDto[] = [];
  displayedColumns = ['id', 'detalle', 'marca', 'delete'];
  formFields: FormFields = new FormFields();
  formData!: FormGroup;
  formInput!: Producto;

  constructor(
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PorductosDto,
    public serviceProducto: ProductosService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) {}
 
    ngOnInit(): void {
      this.getAllData();
      this.initForm();
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    getAllData(): void {
      this.loading = true;
      this.dataList = [];
      this.serviceProducto.getAllProductos()
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
  
    initForm() {
      this.formData = this.fb.group({});
      this.formData.addControl(this.formFields.Detalle, new FormControl(null,[Validators.required]));
      this.formData.addControl(this.formFields.Marca, new FormControl(null,[Validators.required]));
    }

    async save(): Promise<void>{

      this.spinner.show();

      this.formInput = {
        detalle:this.formData.get(this.formFields.Detalle)?.value,
        marca:this.formData.get(this.formFields.Marca)?.value,
      };
      
      console.log('data',this.formInput);
      this.serviceProducto.create(this.formInput)
        .subscribe(
          res => {
            this.spinner.hide();
            this.toastr.success('Producto agregado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.getAllData();
          },
          error => {
            this.spinner.hide();
            this.toastr.error('Ha courrido un error al registrar la producto!!', 'Error!', {
              timeOut: 3000,
            });
          }
        );
    }

    delete(id:number) {
      Swal.fire({
        title:'Atenccion !!',
        text: '¿Está seguro que desea eliminar el producto?',
        showCloseButton: true,
        showCancelButton: true 
      }).then((willDelete) => {
        console.log(willDelete);
        if (willDelete.value) {
          this.serviceProducto.delete(id).subscribe({
            next: (response) => {
              console.log(response);
              Swal.fire('ok!', 'Producto eliminado satisfactoriamente', 'success')
              .then(() => {
                this.getAllData();
              });
            },
            error: () => {
              Swal.fire('Error!', 'No se pudo eliminar el producto', 'error');
            }
          });
        }
    });
  }
}
