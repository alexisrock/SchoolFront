import { Component } from '@angular/core';
import { GetAllMateriasEstudiantes } from '../../../core/domain/models/response/materiasestudianteResponse';
import { CommonModule } from '@angular/common';
import { EstudianteUseCase } from '../../../core/domain/usecases/estudiante/estudianteUseCase';
import { HttpDashboardEstudianteServiceServiceService } from '../../../data/services/http-dashboard-estudiante-service-service.service';
import { DataStore } from '../../../data/stores/data.store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-estudiantesbymateria',
  imports: [CommonModule],

  templateUrl: './estudiantesbymateria.component.html',
  styleUrl: './estudiantesbymateria.component.scss'
})
export class EstudiantesbymateriaComponent {
  estudiantesMateria: GetAllMateriasEstudiantes[] = []
  private readonly materiaestudianteSubscription: Subscription | undefined;
idMateria:number | undefined = 0;
private readonly estudianteUseCase: EstudianteUseCase
  constructor(private readonly service: HttpDashboardEstudianteServiceServiceService, private readonly data: DataStore) {


    this.estudianteUseCase = new  EstudianteUseCase(service);
    this.materiaestudianteSubscription = this.data.currentIdMateria.subscribe(item=>{
      this.idMateria = item

    } )
    this.InitialTable();
  }

  InitialTable(){


    this.estudianteUseCase.ExecuteEstudantesByIdMateria(this.idMateria)
    .subscribe({
      next: (value) => {
          this.estudiantesMateria = value
      },


    })

  }


}
