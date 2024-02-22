import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompraDetalle } from '../models/compra-detalle-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraDetalleService {

  private apiUrl = '/api/compra/detalle';

  constructor(private http: HttpClient) { }

  createCompraDetalle(compra:CompraDetalle): Observable<CompraDetalle>{
    return this.http.post<CompraDetalle>(`${this.apiUrl}/create`,compra);
  }

  delete(id: number): Observable<Response> {
    console.log(id);
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }
}
