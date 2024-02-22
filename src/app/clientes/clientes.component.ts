import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { ClienteDtp } from './models/cliente-dto';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductosComponent } from '../components/modal-productos/modal-productos.component';
import { ModalClientesComponent } from './components/modal-clientes/modal-clientes.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { tipoDocumento } from '../models/tipo-documento-dto';
import { TipoDocumentoService } from '../services/tipo-documento.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit,OnDestroy {

  private clienteCreatedSubscription: Subscription = new Subscription();
  
  public loading = false;
  dataList: ClienteDtp[] = [];
  

  constructor(
    private serviceCliente:ClientesService,
    public dialog: MatDialog,
    
  ){}

  ngOnInit(): void {
    this.getAllData();

    this.clienteCreatedSubscription = this.serviceCliente.clienteCreated$.subscribe(() => {
      this.getAllData();
    });
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceCliente.getAllCLients()
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

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar posibles pérdidas de memoria
    this.clienteCreatedSubscription.unsubscribe();
  }

  openDialog(): void {
    const producto = this.dialog.open(ModalProductosComponent,{
      width:'50%',
      height:'90%'
    });

    producto.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  openDialogCliente(): void {
    const proveedor = this.dialog.open(ModalClientesComponent,{
      width:'52%',
      height:'50%'
    });

    proveedor.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  delete(clienteDto: ClienteDtp) {
    Swal.fire({
      title:'Atenccion !!',
      text: '¿Está seguro que desea eliminar el producto?',
      showCloseButton: true,
      showCancelButton: true 
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete.value) {
        this.serviceCliente.delete(clienteDto.id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success')
            .then(() => {
              this.getAllData();
            });
          },
          error: () => {
            Swal.fire('Error!', 'No se puedo borrar el proveedor', 'error');
          }
        });
      }
  });
}
}
