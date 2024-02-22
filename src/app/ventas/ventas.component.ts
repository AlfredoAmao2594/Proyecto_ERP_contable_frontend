import { Component, OnInit } from '@angular/core';
import { VentaListDto } from './models/venta-dto';
import { Subscription } from 'rxjs';
import { VentaService } from './services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalVentasComponent } from './components/modal-ventas/modal-ventas.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {

  public loading = false;
  dataList: VentaListDto[] = [];
  displayedColumns = ['id', 'fecha', 'descripcion', 'TipoDocumento', 'numeroDocumento','razonSocial','baseImponible','igv','importeTotal'];
  private ventaCreatedSubscription: Subscription = new Subscription();

  constructor(
    private serviceVenta: VentaService,
    public dialog: MatDialog,
  ){
  }

  ngOnInit(): void {
    this.getAllData();
    this.ventaCreatedSubscription = this.serviceVenta.ventasCreated$.subscribe(() => {
      this.getAllData();
    });
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceVenta.getAllVentas()
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


  openDialogVentas(): void {
    const nota = this.dialog.open(ModalVentasComponent,{
      width:'80%',
      height:'85%'
    });

    nota.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };
}
