import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TipoDocumento } from '../model/tipoDocumento.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private http = inject(HttpClient)

  constructor() { }

  listar(){
    return this.http.get<TipoDocumento[]>('http://localhost:8080/api/tipoDocumento/listar')
  }
}
