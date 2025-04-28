import { Observable } from "rxjs";
import { GetAllMateriasEstudiantes,  ListMateriasestudianteResponse, MateriasByEstudianteResponse } from "../domain/models/response/materiasestudianteResponse";
import { InscripcionMateriaRequest } from "../domain/models/request/inscripcionMateriaRequest";
import { BasResponse } from "../domain/models/response/baseResponse";

export abstract class DashboarEstudianteService {

  abstract getMaterias(): Observable<ListMateriasestudianteResponse>;
  abstract sendInscribirMaterias(request: InscripcionMateriaRequest): Observable<BasResponse>;
  abstract getMateriasEstudiante(idUsuario: number| undefined): Observable<MateriasByEstudianteResponse[]>;
  abstract  getEstudianteByIdMateria(idMateria: number| undefined): Observable<GetAllMateriasEstudiantes[]>;

}
