import { LoginService } from "../../../services/login-service";
import { LoginRequest } from "../../models/request/loginRequest";



export class LoginUseCase {


  constructor(private readonly loginService: LoginService) {

  }


  Execute(request: LoginRequest){
    request.Password = btoa(request.Password);
    return this.loginService.loginUsuario(request);
  }

}
