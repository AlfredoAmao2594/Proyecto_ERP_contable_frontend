import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteDtp } from 'src/app/clientes/models/cliente-dto';
import { PorductosDto } from 'src/app/components/modal-productos/model/producto-dto';
import { ComprobanteDto } from 'src/app/models/tipo-comprobante-dto';
import { NotaDto } from 'src/app/notas/models/nota-dto';
import { Venta } from '../../models/venta-dto';
import { VentaDetalle } from '../../models/venta-detalle-dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { TipoComprobanteService } from 'src/app/services/tipo-comprobante.service';
import { ProductosService } from 'src/app/components/modal-productos/productos.service';
import { CompartirDataService } from 'src/app/services/compartir-data.service';
import { VentaService } from '../../services/venta.service';
import { VentaDetalleService } from '../../services/venta-detalle.service';
import { NotasService } from 'src/app/notas/notas.service';
import { DatePipe } from '@angular/common';
import { startWith } from 'rxjs';
import { ModalNotasServiciosVentasComponent } from '../modal-notas-servicios-ventas/modal-notas-servicios-ventas.component';

class FormFields{
  get Fecha(): string { return 'Fecha'; }
  get Cliente(): string { return 'Cliente';}
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
  selector: 'app-modal-ventas',
  templateUrl: './modal-ventas.component.html',
  styleUrl: './modal-ventas.component.scss'
})
export class ModalVentasComponent implements OnInit {

  public loading = false;
  formFields: FormFields = new FormFields();
  formData!: FormGroup;
  clientes:ClienteDtp[]=[];
  comprobantes:ComprobanteDto[]=[];
  productos:PorductosDto[]=[];
  showCards=false;
  item!:NotaDto;
  formInput!: Venta;
  formImputDetail!:VentaDetalle;
  idVenta!:number;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalVentasComponent>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public serviceCliente : ClientesService,
    public serviceComprobante: TipoComprobanteService,
    public serviceProducto: ProductosService,
    private sharedDataService: CompartirDataService,
    public serviceVenta: VentaService,
    public serviceVentaDetalle:VentaDetalleService,
    public serviceNota:NotasService,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void{
    this.getAllClientes();
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
    this.formData.get(this.formFields.Cantidad)?.setValue(nota?.cantidad*-1);
    this.formData.get(this.formFields.Precio)?.setValue(nota?.precio);
    this.formData.get(this.formFields.Total)?.setValue(nota?.impTotal*-1);
    this.formData.get(this.formFields.Comprobante)?.setValue(nota?.idTipoComprobante);
    this.formData.get(this.formFields.Cliente)?.setValue(nota?.idCliente);
    this.formData.get(this.formFields.Producto)?.setValue(nota?.idProducto);
    this.formData.get(this.formFields.Base)?.setValue(nota?.impTotal*-1);

  }
  
  openDialogOrdenes(): void {
    const ordenes = this.dialog.open(ModalNotasServiciosVentasComponent,{
      width:'45%',
      height:'50%'
    });

    ordenes.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

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
    this.formData.addControl(this.formFields.Cliente, new FormControl(null,[Validators.required]));
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


  async save():Promise<void>{
    this.spinner.show();

    const fecha = this.formData.get(this.formFields.Fecha)?.value;
    let fechaFormateada = '';
    
    if (fecha instanceof Date) {
      // Formatear la fecha a 'dd/MM/yyyy'
      fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
    }
    
    this.formInput = {
      id:this.idVenta,
      fecha: fechaFormateada,
      idtipoComprobante: this.formData.get(this.formFields.Comprobante)?.value,
      idCliente:this.formData.get(this.formFields.Cliente)?.value,
      baseImponible: this.formData.get(this.formFields.Base)?.value,
      igv:this.formData.get(this.formFields.Igv)?.value,
      importeTotal: this.formData.get(this.formFields.Importe)?.value,
    };

    
    console.log('data1',this.formInput);

    this.serviceVenta.createVenta(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Venta agregado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.idVenta = res.id
          console.log(res.id)
          this.formImputDetail = {
            idVenta: this.idVenta,
            idProducto: this.formData.get(this.formFields.Producto)?.value,
            cantidad: this.formData.get(this.formFields.Cantidad)?.value,
            precio: this.formData.get(this.formFields.Precio)?.value,
            total: this.formData.get(this.formFields.Total)?.value,
            idnotaservicio:this.formData.get(this.formFields.Orden)?.value,
          };

         this.serviceVentaDetalle.createVentaDetalle(this.formImputDetail)
         .subscribe(
          res =>{
            this.spinner.hide();
            this.toastr.success('Venta Detalle agregada agregado correctamente!!', 'Ok!', {
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
                this.serviceVenta.notifyVentaCreated();
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
    this.formData.get(this.formFields.Cliente)?.reset();
    this.formData.get(this.formFields.Base)?.reset();
    this.formData.get(this.formFields.Igv)?.reset();
    this.formData.get(this.formFields.Importe)?.reset();
  }
}
