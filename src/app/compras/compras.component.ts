import { Component, OnInit } from '@angular/core';
import { CompraListDto } from './models/compra-dto';
import { CompraService } from './services/compra.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComprasComponent } from './components/modal-compras/modal-compras.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent implements OnInit {

  public loading = false;
  dataList: CompraListDto[] = [];
  displayedColumns = ['id', 'fecha', 'descripcion', 'TipoDocumento', 'numeroDocumento','razonSocial','baseImponible','igv','importeTotal'];
  private compraCreatedSubscription: Subscription = new Subscription();

  constructor(
    private serviceCompra: CompraService,
    public dialog: MatDialog,
  ){
  }

  ngOnInit(): void {
    this.getAllData();
    this.compraCreatedSubscription = this.serviceCompra.comprasCreated$.subscribe(() => {
      this.getAllData();
    });
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceCompra.getAllCompras()
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


  openDialogCompras(): void {
    const nota = this.dialog.open(ModalComprasComponent,{
      width:'80%',
      height:'85%'
    });

    nota.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };
}
