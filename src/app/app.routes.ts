import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', loadComponent:()=>import(
            './lista-estudiantes/lista-estudiantes.component')
        .then(m=>m.ListaEstudiantesComponent)
    }
];
