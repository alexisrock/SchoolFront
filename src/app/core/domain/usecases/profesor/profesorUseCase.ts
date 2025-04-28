import { DashboarService } from "../../../services/dashboard-service";
import { MateriaProfesorRequest } from "../../models/request/materiaProfesorRequest";

export class ProfesorUseUseCase {


  constructor(private readonly service: DashboarService) {
  }


  ExecuteMaterias(){
    return this.service.getMaterias();
  }

  ExecuteInsertMaterias(request: MateriaProfesorRequest){
    return this.service.getSendcMateriasProfesor(request);
  }

  ExecuteMateriaByProfesor(idUsuario: number | undefined){
    return this.service.getMateriasByProfesor(idUsuario);
  }

  ExceuteEstudiantesByProfesor(idProfesor: number| undefined , idMateria: number| undefined){
    return this.service.getEstudiantesByProfesor(idProfesor, idMateria);

  }

}
