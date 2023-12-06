import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDtp } from './models/cliente-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = '/api/cliente';

  constructor(private http: HttpClient) { }

  getAllCLients(): Observable<ClienteDtp[]> {
    return this.http.get<ClienteDtp[]>(`${this.apiUrl}/list`);
  }
}
