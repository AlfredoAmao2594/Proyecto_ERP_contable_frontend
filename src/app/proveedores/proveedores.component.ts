import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProveedorDto } from './models/proveedor-dto';
import { ProveedorService } from './proveedores.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductosComponent } from '../components/modal-productos/modal-productos.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ModalProveedoresComponent } from './components/modal-proveedores/modal-proveedores.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit,OnDestroy{

  private proveedorCreatedSubscription: Subscription = new Subscription();
  
  public loading = false;
  dataList: ProveedorDto[] = [];

  constructor(
    private serviceProveedor: ProveedorService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAllData();
    this.proveedorCreatedSubscription = this.serviceProveedor.proveedorCreated$.subscribe(() => {
      this.getAllData();
    });
  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar posibles pérdidas de memoria
    this.proveedorCreatedSubscription.unsubscribe();
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

  openDialogProveedor(): void {
    const proveedor = this.dialog.open(ModalProveedoresComponent,{
      width:'52%',
      height:'50%'
    });

    proveedor.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceProveedor.getAllProveedores()
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

  delete(proveedorDto: ProveedorDto) {
    Swal.fire({
      title:'Atenccion !!',
      text: '¿Está seguro que desea eliminar el producto?',
      showCloseButton: true,
      showCancelButton: true 
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete.value) {
        this.serviceProveedor.delete(proveedorDto.id).subscribe({
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
