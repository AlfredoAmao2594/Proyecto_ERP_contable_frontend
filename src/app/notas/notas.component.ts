import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotaDto } from './models/nota-dto';
import { NotasService } from './notas.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalKardexComponent } from './modal-kardex/modal-kardex.component';
import Swal from 'sweetalert2';
import { ModalNotasComponent } from './modal-notas/modal-notas.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent implements OnInit,OnDestroy{

  private notaCreatedSubscription: Subscription = new Subscription();

  public loading = false;
  dataList: NotaDto[] = [];

  constructor(
    private serviceNota:NotasService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAllData();
    this.notaCreatedSubscription = this.serviceNota.notaCreated$.subscribe(() => {
      this.getAllData();
    });
  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar posibles pérdidas de memoria
    this.notaCreatedSubscription.unsubscribe();
  }

  openDialog(): void {
    const nota = this.dialog.open(ModalKardexComponent,{
      panelClass: 'custom-dialog', 
      width:'50%',
      height:'90%'
    });

    nota.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  openDialogNotas(): void {
    const nota = this.dialog.open(ModalNotasComponent,{
      width:'38%',
      height:'85%'
    });

    nota.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceNota.getAllNotes()
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

  delete(notaDto: NotaDto) {
    Swal.fire({
      title:'Atenccion !!',
      text: '¿Está seguro que desea eliminar el producto?',
      showCloseButton: true,
      showCancelButton: true 
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete.value) {
        this.serviceNota.delete(notaDto.id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success')
            .then(() => {
              this.getAllData();
            });
          },
          error: () => {
            Swal.fire('Error!', 'No se puedo borrar nota', 'error');
          }
        });
      }
    });
  }

}
