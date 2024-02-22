import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Compra, CompraListDto } from '../models/compra-dto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = '/api/compra';

  private comprasCreatedSubject = new Subject<void>();

  comprasCreated$ = this.comprasCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllCompras(): Observable<CompraListDto[]> {
    return this.http.get<CompraListDto[]>(`${this.apiUrl}/list`);
  }

  createCompra(compra:Compra): Observable<Compra>{
    console.log('data3',compra)
    return this.http.post<Compra>(`${this.apiUrl}/create`,compra);
  }

  delete(id: number): Observable<Response> {
    console.log(id);
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }

  notifyCompraCreated() {
    // Emite un evento indicando que se ha creado un cliente
    this.comprasCreatedSubject.next();
  }
  
}
