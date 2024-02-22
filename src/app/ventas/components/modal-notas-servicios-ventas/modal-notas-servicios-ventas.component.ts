import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotaDto } from 'src/app/notas/models/nota-dto';
import { NotasService } from 'src/app/notas/notas.service';
import { VentasComponent } from '../../ventas.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CompartirDataService } from 'src/app/services/compartir-data.service';

@Component({
  selector: 'app-modal-notas-servicios-ventas',
  templateUrl: './modal-notas-servicios-ventas.component.html',
  styleUrl: './modal-notas-servicios-ventas.component.scss'
})
export class ModalNotasServiciosVentasComponent implements OnInit{

  displayedColumns = ['select','id','fecha','numeroDocumento', 'razonSocial','cantidad','precio','impTotal'];
  dataList : NotaDto [] = [];
  public loading = false;
  dataSource = new MatTableDataSource<NotaDto>([]);
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  selection = new SelectionModel<NotaDto>(true, []);

  constructor(  
    private serviceNota:NotasService,
    public dialogRef: MatDialogRef<VentasComponent>,
    private sharedDataService: CompartirDataService,
  ) {
   }

   ngOnInit(): void {
    this.getAllData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  }

  onCheckboxChange(row: NotaDto): void {
    this.selection.toggle(row);
    // Aquí puedes acceder a la nota seleccionada (row) y realizar las acciones necesarias.
    if (this.selection.isSelected(row)) {
      console.log('Nota seleccionada:', row);
      // Realiza acciones adicionales con la nota seleccionada según tus necesidades.
      // Enviar la nota seleccionada al servicio compartido
      this.sharedDataService.enviarNotaSeleccionada(row);
      // Cierra el diálogo si es necesario
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceNota.getAllNotesEgresos()
      .subscribe(
        res => {
          this.dataList = res;
          this.loading = false;
          this.dataSource = new MatTableDataSource<NotaDto>(this.dataList);
        },
        err => {
          this.loading = false;
         
        }
      );
  }
}
