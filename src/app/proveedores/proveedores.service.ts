import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Proveedor, ProveedorDto } from './models/proveedor-dto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl = '/api/proveedor';

  private proveedorCreatedSubject = new Subject<void>();

  proveedorCreated$ = this.proveedorCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllProveedores(): Observable<ProveedorDto[]> {
    return this.http.get<ProveedorDto[]>(`${this.apiUrl}/list`);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }

  create(proveedor:Proveedor): Observable<Proveedor>{
    return this.http.post<Proveedor>(`${this.apiUrl}/create`,proveedor);
  }

  notifyProveedorCreated() {
    // Emite un evento indicando que se ha creado un cliente
    this.proveedorCreatedSubject.next();
  }
}
