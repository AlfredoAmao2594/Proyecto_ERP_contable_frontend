import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tipoDocumento } from '../models/tipo-documento-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private apiUrl = '/api/api';

  constructor(private http: HttpClient) { }

  getAllDocumentos(): Observable<tipoDocumento[]> {
    return this.http.get<tipoDocumento[]>(`${this.apiUrl}/lista`);
  }
}
