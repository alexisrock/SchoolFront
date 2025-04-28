import { Observable } from "rxjs";

import { LoginResponse } from "../domain/models/response/loginResponse";
import { LoginRequest } from "../domain/models/request/loginRequest";


export abstract class LoginService {
  abstract loginUsuario(request: LoginRequest): Observable<LoginResponse>;


}
