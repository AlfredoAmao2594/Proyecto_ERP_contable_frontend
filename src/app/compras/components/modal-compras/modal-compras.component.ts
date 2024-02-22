import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PorductosDto } from 'src/app/components/modal-productos/model/producto-dto';
import { ProductosService } from 'src/app/components/modal-productos/productos.service';
import { ComprobanteDto } from 'src/app/models/tipo-comprobante-dto';
import { ProveedorDto } from 'src/app/proveedores/models/proveedor-dto';
import { ProveedorService } from 'src/app/proveedores/proveedores.service';
import { TipoComprobanteService } from 'src/app/services/tipo-comprobante.service';
import { ModalNotasServiciosComponent } from '../modal-notas-servicios/modal-notas-servicios.component';
import { CompartirDataService } from 'src/app/services/compartir-data.service';
import { NotaDto } from 'src/app/notas/models/nota-dto';
import { startWith } from 'rxjs/operators';
import { Compra } from '../../models/compra-dto';
import { CompraDetalle } from '../../models/compra-detalle-dto';
import { CompraService } from '../../services/compra.service';
import { CompraDetalleService } from '../../services/compra-detalle.service';
import { NotasService } from 'src/app/notas/notas.service';
import { DatePipe } from '@angular/common';


class FormFields{
  get Fecha(): string { return 'Fecha'; }
  get Proveedor(): string { return 'Proveedor';}
  get Comprobante(): string { return 'Comprobante';}
  get Producto(): string { return 'Producto';}
  get Cantidad(): string { return 'Cantidad';}
  get Precio(): string { return 'Precio';}
  get Total(): string { return 'Total';}
  get Numero(): string { return 'Numero';}
  get Orden(): string { return 'Orden';}
  get Igv(): string { return 'Igv';}
  get Base(): string { return 'Base';}
  get Importe(): string { return 'Importe';}

}

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrl: './modal-compras.component.scss'
})
export class ModalComprasComponent implements OnInit {

  public loading = false;
  formFields: FormFields = new FormFields();
  formData!: FormGroup;
  proveedores:ProveedorDto[]=[];
  comprobantes:ComprobanteDto[]=[];
  productos:PorductosDto[]=[];
  showCards=false;
  item!:NotaDto;
  formInput!: Compra;
  formImputDetail!:CompraDetalle;
  idCompra!:number;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalComprasComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public serviceProveedor : ProveedorService,
    public serviceComprobante: TipoComprobanteService,
    public serviceProducto: ProductosService,
    private sharedDataService: CompartirDataService,
    public serviceCompra: CompraService,
    public serviceCompraDetalle:CompraDetalleService,
    public serviceNota:NotasService,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void{
    this.getAllProveedores();
    this.getAllComprobantes();
    this.getAllProductos();
    this.initForm();
    this.sharedDataService.notaSeleccionada$.subscribe(nota => {
      // Hacer algo con la nota seleccionada en ModalComprasComponent
      if(nota !== null){
        this.item = nota;
        this.setValueData(this.item);
      }  
    });
    this.onFormChange();
  }

  setValueData(nota:NotaDto):void{
    this.formData.get(this.formFields.Orden)?.setValue(nota?.id);
    this.formData.get(this.formFields.Cantidad)?.setValue(nota?.cantidad);
    this.formData.get(this.formFields.Precio)?.setValue(nota?.precio);
    this.formData.get(this.formFields.Total)?.setValue(nota?.impTotal);
    this.formData.get(this.formFields.Comprobante)?.setValue(nota?.idTipoComprobante);
    this.formData.get(this.formFields.Proveedor)?.setValue(nota?.idProveedor);
    this.formData.get(this.formFields.Producto)?.setValue(nota?.idProducto);
    this.formData.get(this.formFields.Base)?.setValue(nota?.impTotal);

  }

  onFormChange():void{
    this.formData.get(this.formFields.Base)?.valueChanges
      .pipe(startWith(this.formData.get(this.formFields.Base)?.value)) // Asegura que se ejecute al inicio
      .subscribe((baseValue) => {
        const igvValue = baseValue * 0.18;
        const totalValue = baseValue + igvValue;

        // Actualiza los valores en el formulario
        this.formData.patchValue({
          [this.formFields.Igv]: igvValue,
          [this.formFields.Importe]: totalValue
        });
      });
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
    this.formData.addControl(this.formFields.Numero, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Comprobante, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Producto, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Total, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Cantidad, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Precio, new FormControl(null,[Validators.required]));
    this.formData.addControl(this.formFields.Orden, new FormControl(null,[Validators.required]))
    this.formData.addControl(this.formFields.Base, new FormControl(null,[Validators.required]))
    this.formData.addControl(this.formFields.Igv, new FormControl(null,[Validators.required]))
    this.formData.addControl(this.formFields.Importe, new FormControl(null,[Validators.required])) 
  }

  openDialogOrdenes(): void {
    const ordenes = this.dialog.open(ModalNotasServiciosComponent,{
      width:'45%',
      height:'50%'
    });

    ordenes.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  async save():Promise<void>{
    this.spinner.show();

    const fecha = this.formData.get(this.formFields.Fecha)?.value;
    let fechaFormateada = '';
    
    if (fecha instanceof Date) {
      // Formatear la fecha a 'dd/MM/yyyy'
      fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
    }
    
    this.formInput = {
      id:this.idCompra,
      fecha: fechaFormateada,
      idtipoComprobante: this.formData.get(this.formFields.Comprobante)?.value,
      idProveedor:this.formData.get(this.formFields.Proveedor)?.value,
      baseImponible: this.formData.get(this.formFields.Base)?.value,
      igv:this.formData.get(this.formFields.Igv)?.value,
      importeTotal: this.formData.get(this.formFields.Importe)?.value,
    };

    
    console.log('data1',this.formInput);

    this.serviceCompra.createCompra(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Compra agregado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.idCompra = res.id
          console.log(res.id)
          this.formImputDetail = {
            idCompra: this.idCompra,
            idProducto: this.formData.get(this.formFields.Producto)?.value,
            cantidad: this.formData.get(this.formFields.Cantidad)?.value,
            precio: this.formData.get(this.formFields.Precio)?.value,
            total: this.formData.get(this.formFields.Total)?.value,
            idnotaservicio:this.formData.get(this.formFields.Orden)?.value,
          };

         this.serviceCompraDetalle.createCompraDetalle(this.formImputDetail)
         .subscribe(
          res =>{
            this.spinner.hide();
            this.toastr.success('Compra Detalle agregada agregado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.serviceNota.updateState(this.formImputDetail.idnotaservicio)
            .subscribe(
              res =>{
                this.spinner.hide();
                this.toastr.success('actualizacion de nota agregado correctamente!!', 'Ok!', {
                  timeOut: 3000,
                });
                this.ResetInpust();
                this.serviceCompra.notifyCompraCreated();
                this.dialogRef.close();
              },error => {
                this.spinner.hide();
                this.toastr.error('Ha courrido un error al actualizar!!', 'Error!', {
                  timeOut: 3000,
                });
              }
            )
          },error => {
            this.spinner.hide();
            this.toastr.error('Ha courrido un error al registrar la Compra Detalle!!', 'Error!', {
              timeOut: 3000,
            });
          })

        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la Compra!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
  }


  async ResetInpust():Promise<void>{

    this.formData.get(this.formFields.Comprobante)?.reset();
    this.formData.get(this.formFields.Proveedor)?.reset();
    this.formData.get(this.formFields.Base)?.reset();
    this.formData.get(this.formFields.Igv)?.reset();
    this.formData.get(this.formFields.Importe)?.reset();
  }
}
