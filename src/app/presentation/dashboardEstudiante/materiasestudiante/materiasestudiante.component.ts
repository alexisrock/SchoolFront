import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MateriasByEstudianteResponse } from '../../../core/domain/models/response/materiasestudianteResponse';
import { EstudianteUseCase } from '../../../core/domain/usecases/estudiante/estudianteUseCase';
import { HttpDashboardEstudianteServiceServiceService } from '../../../data/services/http-dashboard-estudiante-service-service.service';
import { AuthService } from '../../../core/guards/auth.guard';
import { DataStore } from '../../../data/stores/data.store';

@Component({
  selector: 'app-materiasestudiante',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './materiasestudiante.component.html',
  styleUrl: './materiasestudiante.component.scss'
})
export class MateriasestudianteComponent {


  materiasByEstudianteResponse: MateriasByEstudianteResponse[] = []

  estudianteUseCase: EstudianteUseCase;
  constructor(private readonly service: HttpDashboardEstudianteServiceServiceService, public router: Router, private readonly auth: AuthService, private readonly data: DataStore){

    this.estudianteUseCase = new EstudianteUseCase(service);
    this.InitialMaterias();
  }

  InitialMaterias(){
    const IdUsuario = this.auth.getCookies()?.IdUsuario;
    this.estudianteUseCase.ExecuteMateriasByIdUsuario(IdUsuario)
    .subscribe({
      next:(value) =>{
          this.materiasByEstudianteResponse = value
      },

    })
  }


  EstudianteMateria(idMateria: number){
    this.data.setCurrentIdMateria(idMateria);
    this.router.navigate(['/estudiante/materiaestudiantes']);
  }

}
