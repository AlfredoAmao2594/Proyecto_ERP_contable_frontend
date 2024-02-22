import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PorductosDto, Producto } from './model/producto-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = '/api/producto';

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<PorductosDto[]> {
    return this.http.get<PorductosDto[]>(`${this.apiUrl}/listado`);
  }

  create(producto:Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.apiUrl}/create`,producto);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }
  
}
