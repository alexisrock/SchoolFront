import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { matchPasswordValidator } from '../../shared/passvalidators';
import { RegisteUseUseCase } from '../../core/domain/usecases/usuario/registeUseUseCase';

import { LoaddingComponent } from "../shared/loadding/loadding.component";
import { LoadingStore } from '../../data/stores/loading.store';
import { HttpUserServiceService } from '../../data/services/http-user-service.service';
import { UsuarioProfesorRequest, UsuarioRequest } from '../../core/domain/models/request/usuarioRequest';
import { CursoReqeust } from '../../core/domain/models/request/cursoReqeust';



@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaddingComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""
  cursos: CursoReqeust[]= [];
  private readonly registeUseUseCase: RegisteUseUseCase

  constructor(private readonly service: HttpUserServiceService, private readonly store: LoadingStore) {
    this.InitialComponents();
    this.registeUseUseCase = new RegisteUseUseCase(service);
    this.InitialCursos();
  }

  optionRol: number=0;

  InitialComponents() {
    this.fg = new FormGroup({
      Nombres: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Rol: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Passwordconfirm: new FormControl('', [Validators.required]),
      Profesion: new FormControl('', [ ]),
      Curso: new FormControl('', [ ])


    }, {
      validators: matchPasswordValidator('Password', 'Passwordconfirm')
    })



  }

  InitialCursos(){
    this.registeUseUseCase.GetCursos()
    .subscribe({
      next: (value) =>{
          this.cursos = value;
      },error: (err)=> {

      }
    })
  }

  SendForm() {
    if (this.fg.valid) {
      this.store.loadingOn();

      if (this.optionRol==1) {
        this.SendProfesor();
      }else if(this.optionRol==2){
        this.SendEstudiante();
      }else{

      }


    }
  }

  SendProfesor(){
    let request = {} as UsuarioProfesorRequest;
    request.Email = this.fg.get('Email')?.value;
    request.NameUsuario = this.fg.get('Nombres')?.value;
    request.IdRol = this.fg.get('Rol')?.value;
    request.Password = this.fg.get('Password')?.value;
    request.Profesion = this.fg.get('Profesion')?.value;
    this.registeUseUseCase.ExecuteProfesor(request)
      .subscribe({
        next: (value: { message: string; }) => {
          this.showMessage(value.message)
          this.store.loadingOff();
          this.fg.reset();
        }, error: (err: any) => {
        }
      })


  }


  SendEstudiante(){
    let request = {} as UsuarioRequest;
    request.Email = this.fg.get('Email')?.value;
    request.NameUsuario = this.fg.get('Nombres')?.value;
    request.IdRol = this.fg.get('Rol')?.value;
    request.Password = this.fg.get('Password')?.value;
    request.IdCurso = this.fg.get('Curso')?.value;
    this.registeUseUseCase.ExecuteEstudiante(request)
      .subscribe({
        next: (value: { message: string; }) => {
          this.showMessage(value.message)
          this.store.loadingOff();
          this.fg.reset();
        }, error: (err: any) => {
        }
      })
  }


  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)

  }

  showOptionsRol(option: number){
    this.optionRol=option;
    if (option==1) {
      this.fg.get('Profesion')?.addValidators(Validators.required)
      this.fg.get('Curso')?.removeValidators(Validators.required)
    }else if (option==2){
      this.fg.get('Curso')?.addValidators(Validators.required)
      this.fg.get('Profesion')?.removeValidators(Validators.required)

    }


  }

}
