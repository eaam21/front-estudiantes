import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Estudiante } from '../model/estudiante.interface';
import { EstudianteDTO } from '../model/estudianteDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private http = inject(HttpClient)

  constructor() { }
  
  listar(){
    return this.http.get<Estudiante[]>('http://localhost:8080/api/estudiante/listar')
  }

  registrar(estudiante:EstudianteDTO){
    return this.http.post('http://localhost:8080/api/estudiante/registrar', estudiante)
  }

  obtener(id:number){
    return this.http.get<Estudiante>('http://localhost:8080/api/estudiante/obtener/'+id)
  }

  actualizar(id:number, estudiante: EstudianteDTO){
    return this.http.put('http://localhost:8080/api/estudiante/actualizar/'+id, estudiante)
  }

  eliminar(id:number){
    return this.http.delete('http://localhost:8080/api/estudiante/eliminar/'+id)
  }
}
