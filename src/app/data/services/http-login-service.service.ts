import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginResponse } from '../../core/domain/models/response/loginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../core/services/login-service';
import { LoginRequest } from '../../core/domain/models/request/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginServiceService implements LoginService {

  constructor(private readonly httpclient: HttpClient) { }

  urlBase: string = "https://localhost:44336/";

  loginUsuario(request: LoginRequest): Observable<LoginResponse> {
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json'    });

    return this.httpclient.post<LoginResponse>(this.urlBase + 'api/Authentication/Authentication', request, { headers });
  }
}
