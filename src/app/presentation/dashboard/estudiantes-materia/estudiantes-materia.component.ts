import { Component } from '@angular/core';
import { MateriasByProfesorResponse } from '../../../core/domain/models/response/materiasByProfesorResponse';
import { HttpDashboardServiceService } from '../../../data/services/http-dashboard-service.service';
import { ProfesorUseUseCase } from '../../../core/domain/usecases/profesor/profesorUseCase';
import { AuthService } from '../../../core/guards/auth.guard';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstudianteProfesorResponse } from '../../../core/domain/models/response/estudianteProfesor';

@Component({
  selector: 'app-estudiantes-materia',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiantes-materia.component.html',
  styleUrl: './estudiantes-materia.component.scss'
})
export class EstudiantesMateriaComponent {

  fg!: FormGroup;

  materiasByProfesorResponse: MateriasByProfesorResponse[] = []
  estudianteProfesor: EstudianteProfesorResponse[] = []

  private readonly profesorUseUseCase: ProfesorUseUseCase;

  constructor(private readonly service: HttpDashboardServiceService, private readonly auth: AuthService) {

    this.profesorUseUseCase = new ProfesorUseUseCase(this.service);
    this.InitialSelect();
    this.InitialComponents();
  }



  InitialComponents(){
    this.fg = new FormGroup({
      Materia: new FormControl('', [Validators.required])
    })

  }


  InitialSelect(){
    let idUser = this.auth.getCookies()?.IdUsuario;

    this.profesorUseUseCase.ExecuteMateriaByProfesor(idUser)
    .subscribe({
      next: (value) => {
          this.materiasByProfesorResponse = value
      },error: (err)  =>{

      },
    })
  }


  SendForm(){
    console.log(this.fg.valid)
    if (this.fg.valid) {
      let idProfesor = this.auth.getCookies()?.IdTipo;
      let idMateria = this.fg.get('Materia')?.value;

      this.profesorUseUseCase.ExceuteEstudiantesByProfesor(idProfesor,idMateria )
      .subscribe({
        next: (value) => {
          this.estudianteProfesor = value
        }, error: (err)  =>{

        },

      })

    }

  }
}
