import { Component, Inject, Optional, inject } from '@angular/core';
import { TipoDocumentoService } from '../services/tipo-documento.service';
import { TipoDocumento } from '../model/tipoDocumento.interface';
import { EstudianteDTO } from '../model/estudianteDTO.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EstudianteService } from '../services/estudiante.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Estudiante } from '../model/estudiante.interface';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatSelectModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  private tipoDocumentoService = inject(TipoDocumentoService)
  private estudianteService = inject(EstudianteService)
  listaTipoDocumento:TipoDocumento[]=[]
  local_data:any
  action:string=""
  estudiante: EstudianteDTO={
    apellidoPaterno:'',
    apellidoMaterno:'',
    nombres:'',
    numeroDocumento:'',
    telefono:'',
    carrera:'',
    correo:'',
    tipoDocumento:0
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

constructor(
  public dialogRef: MatDialogRef<DialogBoxComponent>,
  private _snackBar: MatSnackBar,
  @Optional() @Inject(MAT_DIALOG_DATA) public dataEstudiante:Estudiante
){
  this.local_data = {...dataEstudiante}
  this.action = this.local_data.action
}

  ngOnInit(): void {
    this.tipoDocumentoService.listar().subscribe(
      (respTipo)=>{
        this.listaTipoDocumento=respTipo
      }
    )
    if(this.dataEstudiante != null){
      this.estudianteService.obtener(this.dataEstudiante.idEstudiante).subscribe(
        (resp)=>{
          this.estudiante.apellidoPaterno=resp.apellidoPaterno
          this.estudiante.apellidoMaterno=resp.apellidoMaterno
          this.estudiante.nombres=resp.nombres
          this.estudiante.tipoDocumento=resp.tipoDocumento.idDocumento
          this.estudiante.numeroDocumento=resp.numeroDocumento
          this.estudiante.carrera=resp.carrera
          this.estudiante.telefono=resp.telefono
          this.estudiante.correo=resp.correo
        }
      )
    }
  }

  guardar(): void{
    if(this.dataEstudiante != null){
      this.estudianteService.actualizar(this.dataEstudiante.idEstudiante,this.estudiante).subscribe(
        (resp:any)=>{
          this.dialogRef.close({respuestaGuardar:resp.data})
          this.openSnackBar(resp.mensaje)
        }
      )
    }else{
      this.estudianteService.registrar(this.estudiante).subscribe(
        (resp:any)=>{
          console.log(resp)
          this.dialogRef.close({respuestaGuardar:resp.data})
          this.openSnackBar(resp.mensaje)
        }
      )
    }
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:1000
    });
  }

}
