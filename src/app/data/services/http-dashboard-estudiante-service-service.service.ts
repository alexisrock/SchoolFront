import { Injectable } from '@angular/core';
import { DashboarEstudianteService } from '../../core/services/dashboar-estudiante-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetAllMateriasEstudiantes, ListGetAllMateriasEstudiantes, ListMateriasestudianteResponse, MateriasByEstudianteResponse } from '../../core/domain/models/response/materiasestudianteResponse';
import { Observable } from 'rxjs';
import { BasResponse } from '../../core/domain/models/response/baseResponse';
import { InscripcionMateriaRequest } from '../../core/domain/models/request/inscripcionMateriaRequest';

@Injectable({
  providedIn: 'root'
})
export class HttpDashboardEstudianteServiceServiceService implements DashboarEstudianteService {

  constructor(private readonly httpclient: HttpClient) { }


  urlBase: string = "https://localhost:44336/";


  GetHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  getMaterias(): Observable<ListMateriasestudianteResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.get<ListMateriasestudianteResponse>(this.urlBase + 'api/Materia/GetAllMaterias', { headers });
  }

  sendInscribirMaterias(request: InscripcionMateriaRequest): Observable<BasResponse> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.post<BasResponse>(this.urlBase + 'api/InscripcionMateria/Create',request, { headers });
  }

  getMateriasEstudiante(idUsuario: number| undefined): Observable<MateriasByEstudianteResponse[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.get<MateriasByEstudianteResponse[]>(this.urlBase + `api/Estudiante/GetAllByIdEstudiante/${idUsuario}`, { headers });
  }


  getEstudianteByIdMateria(idMateria: number| undefined): Observable<GetAllMateriasEstudiantes[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpclient.get<GetAllMateriasEstudiantes[]>(this.urlBase + `api/Estudiante/GetAllMateriasEstudiantes/${idMateria}`, { headers });
  }


}
