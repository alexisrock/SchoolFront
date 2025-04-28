import { Component } from '@angular/core';
import { MateriasestudianteResponse } from '../../../core/domain/models/response/materiasestudianteResponse';
import { EstudianteUseCase } from '../../../core/domain/usecases/estudiante/estudianteUseCase';
import { HttpDashboardEstudianteServiceServiceService } from '../../../data/services/http-dashboard-estudiante-service-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InscripcionMateriaRequest, InscripcionMateriasRequest } from '../../../core/domain/models/request/inscripcionMateriaRequest';
import { AuthService } from '../../../core/guards/auth.guard';

@Component({
  selector: 'app-inscribirmaterias',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscribirmaterias.component.html',
  styleUrl: './inscribirmaterias.component.scss'
})
export class InscribirmateriasComponent {

  loading: boolean = false;
  message: string = ""
  materiasSeleccionadas: InscripcionMateriasRequest[] = []
  materiasestudianteResponse: MateriasestudianteResponse[] = []

  estudianteUseCase: EstudianteUseCase;
  constructor(private readonly service: HttpDashboardEstudianteServiceServiceService, private readonly auth: AuthService) {

    this.estudianteUseCase = new EstudianteUseCase(service);
    this.InitialMaterias();
  }


InitialMaterias(){
  this.estudianteUseCase.ExecuteMaterias()
  .subscribe({
    next:(value)=> {
      this.materiasestudianteResponse = value.sort((a, b) => {
        if (a.Descripcion < b.Descripcion) {
          return -1;
        }
        if (a.Descripcion > b.Descripcion) {
          return 1;
        }
        return 0;
      }  )
    },

  })
}

  toggleMateria(idmateria: number, idProfesor: number) {
   let materia = {} as InscripcionMateriasRequest;
    materia.IdMateriaProfesor = idmateria
    materia.IdProfesor = idProfesor
    const index = this.materiasSeleccionadas.findIndex(x  => x.IdMateriaProfesor === idmateria);

    if (index > -1) {
      this.materiasSeleccionadas.splice(index, 1);
    } else {
     this.validarprofesor(materia);
    }
  }

  validarprofesor(materia:InscripcionMateriasRequest  ){
    let materiaProfesor = this.materiasSeleccionadas.find(x  => x.IdProfesor===materia.IdProfesor);
    if (materiaProfesor=== null || materiaProfesor===undefined) {
      this.materiasSeleccionadas.push(materia);
    }else{
      this.showMessage("Ya tiene una materia registrado con ese profesor");
      const todosLosCheckboxes = document.querySelectorAll<HTMLInputElement>('[id="checkChecked'+materia.IdMateriaProfesor+'"]');
    todosLosCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    }
  }


  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)

  }



  enviarMaterias() {
     if (this.materiasSeleccionadas.length!=0 &&  this.materiasSeleccionadas.length<4 ) {
          let request = {} as InscripcionMateriaRequest;
          request.Materias = this.materiasSeleccionadas
          request.IdEstudiante = this.auth.getCookies()?.IdTipo;
          this.estudianteUseCase.ExecuteInscribirMaterias(request)
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
          this.showMessage("Debe seleccionar al  menos una materia y maximo tres materias")
        }
  }


  limpiarCheck(){
    const todosLosCheckboxes = document.querySelectorAll<HTMLInputElement>('[type="checkbox"]');
    todosLosCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    this.materiasSeleccionadas = []
  }

}
