import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Venta, VentaListDto } from '../models/venta-dto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = '/api/venta';

  private ventasCreatedSubject = new Subject<void>();

  ventasCreated$ = this.ventasCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllVentas(): Observable<VentaListDto[]> {
    return this.http.get<VentaListDto[]>(`${this.apiUrl}/list`);
  }

  createVenta(venta:Venta): Observable<Venta>{
    return this.http.post<Venta>(`${this.apiUrl}/create`,venta);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }

  notifyVentaCreated() {
    // Emite un evento indicando que se ha creado un cliente
    this.ventasCreatedSubject.next();
  }
}
