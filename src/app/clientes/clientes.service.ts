import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente, ClienteDtp } from './models/cliente-dto';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = '/api/cliente';

  private clienteCreatedSubject = new Subject<void>();
  
  clienteCreated$ = this.clienteCreatedSubject.asObservable();

  constructor(private http: HttpClient,) { }

  getAllCLients(): Observable<ClienteDtp[]> {
    return this.http.get<ClienteDtp[]>(`${this.apiUrl}/list`);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }

  create(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}/create`,cliente);
  }

  notifyClientCreated() {
    // Emite un evento indicando que se ha creado un cliente
    this.clienteCreatedSubject.next();
  }
}
