import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboarService } from '../../core/services/dashboard-service';
import { ListMateriaResponse } from '../../core/domain/models/response/materiaResponse';
import { MateriaProfesorRequest } from '../../core/domain/models/request/materiaProfesorRequest';
import { BasResponse } from '../../core/domain/models/response/baseResponse';
import { ListmateriasByProfesorResponse } from '../../core/domain/models/response/materiasByProfesorResponse';
import { ListEstudianteProfesor } from '../../core/domain/models/response/estudianteProfesor';


@Injectable({
  providedIn: 'root'
})
export class HttpDashboardServiceService implements DashboarService {

  constructor(private readonly httpclient: HttpClient) { }


  urlBase: string = "https://localhost:44336/";


  GetHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }



  getMaterias():Observable<ListMateriaResponse>  {
      let  headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.httpclient.get<ListMateriaResponse>(this.urlBase + 'api/Materia/GetAll',  { headers });
    }



    getSendcMateriasProfesor(request: MateriaProfesorRequest):Observable<BasResponse>  {
      let  headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.httpclient.post<BasResponse>(this.urlBase + 'api/MateriaProfesor/Create',  request, { headers });
    }

    getMateriasByProfesor(idUsuario: number| undefined): Observable<ListmateriasByProfesorResponse> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.httpclient.get<ListmateriasByProfesorResponse>(this.urlBase + `api/Profesor/GetAllMaterias/${idUsuario}`, { headers });
    }



    getEstudiantesByProfesor(idProfesor: number| undefined , idMateria: number| undefined): Observable<ListEstudianteProfesor> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.httpclient.get<ListEstudianteProfesor>(this.urlBase + `api/Profesor/GetAllEstudiantesMateria?idProfesor=${idProfesor}&idMateria=${idMateria}`, { headers });
    }

}
