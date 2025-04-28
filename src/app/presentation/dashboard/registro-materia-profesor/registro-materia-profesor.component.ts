import { Component } from '@angular/core';
import { MateriaResponse } from '../../../core/domain/models/response/materiaResponse';
import { ProfesorUseUseCase } from '../../../core/domain/usecases/profesor/profesorUseCase';
import { HttpDashboardServiceService } from '../../../data/services/http-dashboard-service.service';
import { MateriaProfesor, MateriaProfesorRequest } from '../../../core/domain/models/request/materiaProfesorRequest';
import { AuthService } from '../../../core/guards/auth.guard';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-materia-profesor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-materia-profesor.component.html',
  styleUrl: './registro-materia-profesor.component.scss'
})
export class RegistroMateriaProfesorComponent {

  loading: boolean = false;
  message: string = ""
  materias: MateriaResponse[] = []
  materiasSeleccionadas: MateriaProfesor[] = []
  fg!: FormGroup;
  private readonly profesorUseUseCase: ProfesorUseUseCase;

  constructor(private readonly service: HttpDashboardServiceService, private readonly auth: AuthService) {

    this.profesorUseUseCase = new ProfesorUseUseCase(this.service);
    this.InitMaterias()

  }

  InitMaterias() {
    this.profesorUseUseCase.ExecuteMaterias()
      .subscribe({
        next: (value) => {
          this.materias = value
        },
      });

  }


  toggleMateria(idmateria: number) {
    let materia = {} as MateriaProfesor;
    materia.IdMateria = idmateria
    const index = this.materiasSeleccionadas.findIndex(x  => x.IdMateria === idmateria);

    if (index > -1) {
      this.materiasSeleccionadas.splice(index, 1);
    } else {
      this.materiasSeleccionadas.push(materia);
    }
  }

  enviarMaterias(){

    if (this.materiasSeleccionadas.length!=0 &&  this.materiasSeleccionadas.length<3 ) {
      let request = {} as MateriaProfesorRequest;
      request.Materias = this.materiasSeleccionadas
      request.IdProfesor = this.auth.getCookies()?.IdTipo;
      this.profesorUseUseCase.ExecuteInsertMaterias(request)
      .subscribe({
        next: (value) => {
          this.showMessage(value.message)
          this.limpiarCheck()
        },error: (err) =>{
          this.showMessage(err.message)
          this.limpiarCheck()
        }
      })
    }
    else{
      this.showMessage("Debe seleccionar al  menos una materia y maximo dos materias")
    }
  }


  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)

  }

  limpiarCheck(){
    const todosLosCheckboxes = document.querySelectorAll<HTMLInputElement>('[type="checkbox"]');
    todosLosCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }



}
