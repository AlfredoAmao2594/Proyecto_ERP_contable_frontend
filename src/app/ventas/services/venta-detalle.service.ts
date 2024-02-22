import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VentaDetalle } from '../models/venta-detalle-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaDetalleService {

  private apiUrl = '/api/venta/detalle';

  constructor(private http: HttpClient) { }
  
  createVentaDetalle(venta:VentaDetalle): Observable<VentaDetalle>{
    return this.http.post<VentaDetalle>(`${this.apiUrl}/create`,venta);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }
}
