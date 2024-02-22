import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotaDto } from '../notas/models/nota-dto';

@Injectable({
  providedIn: 'root'
})
export class CompartirDataService {

  private notaSeleccionadaSource = new BehaviorSubject<NotaDto | null>(null);
  notaSeleccionada$ = this.notaSeleccionadaSource.asObservable();

  enviarNotaSeleccionada(nota: NotaDto): void {
    this.notaSeleccionadaSource.next(nota);
  }
}