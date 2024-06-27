import { TipoDocumento } from "./tipoDocumento.interface";

export interface Estudiante{
    idEstudiante: number,
    apellidoPaterno: string,
    apellidoMaterno: string,
    nombres: string,
    carrera:string,
    numeroDocumento:string,
    telefono:string,
    correo:string,
    tipoDocumento: TipoDocumento
}