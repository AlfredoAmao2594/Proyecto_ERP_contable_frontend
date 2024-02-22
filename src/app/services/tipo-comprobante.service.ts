import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComprobanteDto } from '../models/tipo-comprobante-dto';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  private apiUrl = '/api/TipoComprobante';

  constructor(private http: HttpClient) { }

  getAllComprobantes(): Observable<ComprobanteDto[]> {
    return this.http.get<ComprobanteDto[]>(`${this.apiUrl}/listado`);
  }
}
