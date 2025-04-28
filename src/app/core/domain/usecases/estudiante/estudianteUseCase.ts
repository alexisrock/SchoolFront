import { DashboarEstudianteService } from "../../../services/dashboar-estudiante-service";
import { InscripcionMateriaRequest } from "../../models/request/inscripcionMateriaRequest";

export class EstudianteUseCase{


  /**
   *
   */
  constructor(private readonly service: DashboarEstudianteService) {
  }

  ExecuteMaterias(){
    return this.service.getMaterias();
  }

  ExecuteInscribirMaterias(request: InscripcionMateriaRequest){
    return  this.service.sendInscribirMaterias(request);
  }

  ExecuteMateriasByIdUsuario(idUsuario: number| undefined){
    return  this.service.getMateriasEstudiante(idUsuario);
  }

  ExecuteEstudantesByIdMateria(idMateria: number| undefined){
    return this.service.getEstudianteByIdMateria(idMateria);
  }



}
