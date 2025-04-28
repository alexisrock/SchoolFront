import { Observable } from "rxjs";
import { ListMateriaResponse } from "../domain/models/response/materiaResponse";
import { MateriaProfesorRequest } from "../domain/models/request/materiaProfesorRequest";
import { BasResponse } from "../domain/models/response/baseResponse";
import { ListmateriasByProfesorResponse } from "../domain/models/response/materiasByProfesorResponse";
import { ListEstudianteProfesor } from "../domain/models/response/estudianteProfesor";


export abstract class DashboarService {

  abstract getMaterias():Observable<ListMateriaResponse> ;
  abstract getSendcMateriasProfesor(request: MateriaProfesorRequest):Observable<BasResponse>;
  abstract getMateriasByProfesor(idUsuario: number | undefined): Observable<ListmateriasByProfesorResponse>;
  abstract getEstudiantesByProfesor(idProfesor: number| undefined , idMateria: number| undefined): Observable<ListEstudianteProfesor>;

}
