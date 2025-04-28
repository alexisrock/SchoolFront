export interface UsuarioRequest {
  NameUsuario: string
  Email: string
  Password: string
  IdRol: number
  IdCurso: number
}


export interface UsuarioProfesorRequest {
  NameUsuario: string
  Email: string
  Password: string
  IdRol: number
  Profesion: string
}
