import { Observable } from "rxjs";
import { UsuarioProfesorRequest, UsuarioRequest } from "../domain/models/request/usuarioRequest";
import { BasResponse } from "../domain/models/response/baseResponse";
import { ListCursoReqeust } from "../domain/models/request/cursoReqeust";


export abstract class UserService {
  abstract registroProfesor(request: UsuarioProfesorRequest):Observable<BasResponse>
  abstract registroEstudiante(request: UsuarioRequest):Observable<BasResponse>
 abstract  getCursos():Observable<ListCursoReqeust>;
}
