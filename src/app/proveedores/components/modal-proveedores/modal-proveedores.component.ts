import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../models/proveedor-dto';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../proveedores.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { tipoDocumento } from 'src/app/models/tipo-documento-dto';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

class FormFields{
  get Tipo(): string { return 'Tipo'; }
  get Numero(): string { return 'Numero';}
  get Razon(): string { return 'Razon';}
  get Pais(): string { return 'Pais';}
  get Ciudad(): string { return 'Ciudad';}
  get Direccion(): string { return 'Direccion';}
}

@Component({
  selector: 'app-modal-proveedores',
  templateUrl: './modal-proveedores.component.html',
  styleUrl: './modal-proveedores.component.scss'
})
export class ModalProveedoresComponent implements OnInit{

  public loading = false;
  formFields: FormFields = new FormFields();
  formData!: FormGroup;
  formInput!: Proveedor;
  documentos: tipoDocumento[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalProveedoresComponent>,
    public serviceProveedor : ProveedorService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private serviceDocumentos:TipoDocumentoService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.getAllDocumentos();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllDocumentos(): void{
    this.documentos = [];
    this.serviceDocumentos.getAllDocumentos()
    .subscribe(
      res =>{
        this.documentos = res;
      }
    )
  }
  
  initForm() {
    this.formData = this.fb.group({});
    this.formData.addControl(this.formFields.Tipo, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Razon, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Numero, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Ciudad, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Direccion, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Pais, new FormControl(null,[Validators.required]));
  }

  async save(): Promise<void>{

    this.spinner.show();

    this.formInput = {
      idTipoDocumento:this.formData.get(this.formFields.Tipo)?.value,
      numeroDocumento:this.formData.get(this.formFields.Numero)?.value,
      razonSocial:this.formData.get(this.formFields.Razon)?.value,
      pais:this.formData.get(this.formFields.Pais)?.value,
      ciudad:this.formData.get(this.formFields.Ciudad)?.value,
      direccion:this.formData.get(this.formFields.Direccion)?.value,
    };
    
    console.log('data',this.formInput);
    this.serviceProveedor.create(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Producto agregado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.serviceProveedor.notifyProveedorCreated();
          this.dialogRef.close();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la producto!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
  }

}
