import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotaCreate, NotaDto, NotaReporte } from './models/nota-dto';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private apiUrl = '/api/nota';

  private notaCreatedSubject = new Subject<void>();

  notaCreated$ = this.notaCreatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<NotaDto[]> {
    return this.http.get<NotaDto[]>(`${this.apiUrl}/listado`);
  }

  getReportNote(): Observable<NotaReporte[]>{
    return this.http.get<NotaReporte[]>(`${this.apiUrl}/reportes`)
  }

  generarReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generarReporte`,{ responseType: 'blob' });
  }

  delete(id: number): Observable<Response> {
    console.log(id);
    return this.http.delete<Response>(`${this.apiUrl}/delete/${id}`);
  }

  createNotaSell(notaCreate:NotaCreate): Observable<NotaCreate>{
    return this.http.post<NotaCreate>(`${this.apiUrl}/create/NotaSell`,notaCreate);
  }

  createNotaPurchase(notaCreate:NotaCreate): Observable<NotaCreate>{
    return this.http.post<NotaCreate>(`${this.apiUrl}/create/NotaPurchase`,notaCreate);
  }

  notifyProveedorCreated() {
    // Emite un evento indicando que se ha creado un cliente
    this.notaCreatedSubject.next();
  }

  updateState(idNota:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update/state/${idNota}`,null)
  }
  
  getAllNotesIngresos():Observable<NotaDto[]>{
    return this.http.get<NotaDto[]>(`${this.apiUrl}/listado/ingresos`)
  }

  getAllNotesEgresos():Observable<NotaDto[]>{
    return this.http.get<NotaDto[]>(`${this.apiUrl}/listado/egresos`)
  }
}
