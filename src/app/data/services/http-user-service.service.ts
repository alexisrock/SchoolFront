import { Injectable } from '@angular/core';

import { UsuarioProfesorRequest, UsuarioRequest } from '../../core/domain/models/request/usuarioRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasResponse } from "../../core/domain/models/response/baseResponse";
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import { ListCursoReqeust } from '../../core/domain/models/request/cursoReqeust';




@Injectable({
  providedIn: 'root'
})
export class HttpUserServiceService implements UserService {

  constructor(private readonly httpclient: HttpClient) { }

  urlBase: string = "https://localhost:44336/";



  registroProfesor(request: UsuarioProfesorRequest): Observable<BasResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.post<BasResponse>(this.urlBase + 'api/Authentication/CreateProfesor', request, { headers });
  }



  registroEstudiante(request: UsuarioRequest): Observable<BasResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.post<BasResponse>(this.urlBase + 'api/Authentication/CreateEstudiante', request, { headers });
  }

  getCursos(): Observable<ListCursoReqeust> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.get<ListCursoReqeust>(this.urlBase + 'api/Curso/GetAll', { headers });
  }



}
