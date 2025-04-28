import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardestudianteComponent } from './dashboardestudiante/dashboardestudiante.component';
import { InscribirmateriasComponent } from './inscribirmaterias/inscribirmaterias.component';
import { OpcionesestudianteComponent } from './opcionesestudiante/opcionesestudiante.component';
import { MateriasestudianteComponent } from './materiasestudiante/materiasestudiante.component';
import { EstudiantesbymateriaComponent } from './estudiantesbymateria/estudiantesbymateria.component';

export const routes: Routes = [
  { path: '',
    component: DashboardestudianteComponent,
    children: [
      { path: '', component: OpcionesestudianteComponent},
      { path: 'inscribirmaterias', component: InscribirmateriasComponent},
      { path: 'verestudiantesmateria', component: MateriasestudianteComponent},
      { path: 'materiaestudiantes', component: EstudiantesbymateriaComponent},




    ]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardestudianteModule { }
