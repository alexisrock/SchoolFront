import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', component: UsuarioComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuarioModule { }
