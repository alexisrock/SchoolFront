import { RegistroMateriaProfesorComponent } from './registro-materia-profesor/registro-materia-profesor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProfesorComponent } from './dashboard-profesor/dashboard-profesor.component';
import { EstudiantesMateriaComponent } from './estudiantes-materia/estudiantes-materia.component';


export const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardProfesorComponent},
      { path: 'registrarmateria', component: RegistroMateriaProfesorComponent},
      { path: 'verestudiantesmateria', component: EstudiantesMateriaComponent},

    ]},
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
