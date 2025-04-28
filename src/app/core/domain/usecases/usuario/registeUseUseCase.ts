import { UserService } from "../../../services/user-service";
import { UsuarioProfesorRequest, UsuarioRequest } from "../../models/request/usuarioRequest";





export class RegisteUseUseCase {


  constructor(private readonly service: UserService) {
  }

  ExecuteEstudiante(request: UsuarioRequest){
    request.Password =  btoa(request.Password);
    return this.service.registroEstudiante(request);
  }

  ExecuteProfesor(request: UsuarioProfesorRequest){
    request.Password =  btoa(request.Password);
    return this.service.registroProfesor(request);
  }

  GetCursos(){
    return this.service.getCursos();
  }

}
