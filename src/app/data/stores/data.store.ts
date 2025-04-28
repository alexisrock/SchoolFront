import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class DataStore {




  private readonly currentIdMateriaSubject: BehaviorSubject<number> = new BehaviorSubject({} as number);
  public readonly currentIdMateria: Observable<number> = this.currentIdMateriaSubject.asObservable();



  setCurrentIdMateria(idmateria: number): void {
    this.currentIdMateriaSubject.next(idmateria);
  }



}
