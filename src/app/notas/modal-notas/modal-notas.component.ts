import { Component, Inject, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotaCreate, NotaDto } from '../models/nota-dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProveedorService } from 'src/app/proveedores/proveedores.service';
import { ProveedorDto } from 'src/app/proveedores/models/proveedor-dto';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { ClienteDtp } from 'src/app/clientes/models/cliente-dto';
import { ComprobanteDto } from 'src/app/models/tipo-comprobante-dto';
import { TipoComprobanteService } from 'src/app/services/tipo-comprobante.service';
import { ProductosService } from 'src/app/components/modal-productos/productos.service';
import { PorductosDto } from 'src/app/components/modal-productos/model/producto-dto';

class FormFields{
  get Fecha(): string { return 'Fecha'; }
  get Tipo(): string { return 'Tipo';}
  get Proveedor(): string { return 'Proveedor';}
  get Cliente(): string { return 'Cliente';}
  get Comprobante(): string { return 'Comprobante';}
  get Producto(): string { return 'Producto';}
  get Cantidad(): string { return 'Cantidad';}
  get Precio(): string { return 'Precio';}
  get Importe(): string { return 'Importe';}
}


@Component({
  selector: 'app-modal-notas',
  templateUrl: './modal-notas.component.html',
  styleUrl: './modal-notas.component.scss'
})
export class ModalNotasComponent implements OnInit{

  public loading = false;
  formFields: FormFields = new FormFields();
  formData!: FormGroup;
  formInput!: NotaCreate;
  proveedores:ProveedorDto[]=[];
  clientes:ClienteDtp[]=[];
  comprobantes:ComprobanteDto[]=[];
  productos:PorductosDto[]=[];
  showCards=false;
  tipo:string='ingreso';

  tipos = [
    {value: 'ingreso', viewValue: 'ingreso'},
    {value: 'egreso', viewValue: 'egreso'}
  ];

  constructor(
    private serviceNotas:NotasService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalNotasComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public serviceProveedor : ProveedorService,
    public serviceCliente: ClientesService,
    public serviceComprobante: TipoComprobanteService,
    public serviceProducto: ProductosService
  ){}

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  setTypeChance(selectedValue: string): void {
    if (selectedValue === 'ingreso') {
      this.setIngreso();
    } else if (selectedValue === 'egreso') {
      this.setEgreso();
    }
  }

  setIngreso(): void {
    this.tipo = 'ingreso';
    console.log('---Ingreso---', this.tipo);
  }
  
  setEgreso(): void {
    this.tipo = 'egreso';
    console.log('---Egreso---', this.tipo);
  }

  ngOnInit(): void{
    this.getAllProveedores();
    this.getAllClientes();
    this.getAllComprobantes();
    this.setTypeChance(this.tipo);
    this.initForm();
    this.getAllProductos();
    
  }

  getAllProveedores(): void{
    this.proveedores = [];
    this.serviceProveedor.getAllProveedores()
    .subscribe(
      res =>{
        this.proveedores = res;
      }
    )
  }

  getAllClientes(): void{
    this.clientes = [];
    this.serviceCliente.getAllCLients()
    .subscribe(
      res =>{
        this.clientes = res;
      }
    )
  }

  getAllComprobantes(): void{
    this.comprobantes = [];
    this.serviceComprobante.getAllComprobantes()
    .subscribe(
      res =>{
        this.comprobantes = res;
      }
    )
  }

  getAllProductos(): void{
    this.productos = [];
    this.serviceProducto.getAllProductos()
    .subscribe(
      res =>{
        this.productos = res;
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm() {
    this.formData = this.fb.group({});
    this.formData.addControl(this.formFields.Fecha, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Proveedor, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Tipo, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Comprobante, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Producto, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Cliente, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Cantidad, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Precio, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Importe, new FormControl(null,[Validators.required]))
    
  }


  async save(): Promise<void>{

    this.spinner.show();

    this.formInput = {
      fecha:this.formData.get(this.formFields.Fecha)?.value,
      tipoNota:this.formData.get(this.formFields.Tipo)?.value,
      idProveedor:this.formData.get(this.formFields.Proveedor)?.value,
      idTipoComprobante:this.formData.get(this.formFields.Comprobante)?.value,
      idCliente:this.formData.get(this.formFields.Cliente)?.value,
      idProducto:this.formData.get(this.formFields.Producto)?.value,
      cantidad:this.formData.get(this.formFields.Cantidad)?.value,
      precio:this.formData.get(this.formFields.Precio)?.value,
      impTotal:this.formData.get(this.formFields.Importe)?.value,
      state:0,
    };
    
    console.log('data',this.formInput);
    if(this.tipo == 'ingreso'){
      this.serviceNotas.createNotaPurchase(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Nota de Compra agregado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.serviceNotas.notifyProveedorCreated();
          this.dialogRef.close();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la Nota de Compra!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else{
      this.serviceNotas.createNotaSell(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Nota de Venta agregado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.serviceNotas.notifyProveedorCreated();
          this.dialogRef.close();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la Nota de Venta!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }
    
  }
  
}

