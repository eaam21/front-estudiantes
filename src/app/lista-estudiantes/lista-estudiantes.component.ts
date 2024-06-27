import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../model/estudiante.interface';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, MatTooltipModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './lista-estudiantes.component.html',
  styleUrl: './lista-estudiantes.component.css'
})
export class ListaEstudiantesComponent{
  private estudianteService = inject(EstudianteService)
  private dialog = inject(MatDialog)
  
  dataSource:any
  columnas: string[]=['idEstudiante', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'tipoDocumento', 'numeroDocumento', 'carrera', 'correo', 'telefono', 'acciones']

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  
  ngOnInit():void{
    this.estudianteService.listar().subscribe(
      (estudiante)=>{
        console.log(estudiante)
        this.dataSource = new MatTableDataSource<Estudiante>(estudiante);
        this.dataSource.paginator=this.paginator
      }
    )
  }

  nuevoEstudiante():void{
    const dialogRef = this.dialog.open(DialogBoxComponent, {});
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.addRowData(result.respuestaGuardar)
      }
    })
  }

  addRowData(row_obj:Estudiante){
    const data = this.dataSource.data;
    data.push(row_obj);
    this.dataSource.data=data;
    this.table.renderRows();
  }

  editarEstudiante(idEstudiante:number): void{
    this.dialog.open(DialogBoxComponent, {
      data:{
        "idEstudiante":idEstudiante
      }
    });
  }

}
