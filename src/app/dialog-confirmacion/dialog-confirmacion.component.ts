import { Component, Inject, Optional, inject } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../model/estudiante.interface';
@Component({
  selector: 'app-dialog-confirmacion',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatDialogActions, FormsModule, MatButtonModule, MatDialogClose],
  templateUrl: './dialog-confirmacion.component.html',
  styleUrl: './dialog-confirmacion.component.css'
})
export class DialogConfirmacionComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private estudianteService = inject(EstudianteService)

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacionComponent>,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataEstudiante:Estudiante //para traer datos de la ventana principal, en este caso el idEstudiante
  ){
  }

  eliminar(): void {
    if(this.dataEstudiante!=null){
      this.estudianteService.eliminar(this.dataEstudiante.idEstudiante).subscribe((resp:any)=>{
        this.dialogRef.close({respuestaEliminar:resp.data})
        this.openSnackBar(resp.mensaje)
      })
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
