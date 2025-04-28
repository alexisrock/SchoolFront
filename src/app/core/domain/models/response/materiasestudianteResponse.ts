export type ListMateriasestudianteResponse = MateriasestudianteResponse[]

export interface MateriasestudianteResponse {
  Id: number
  IdMateria: number
  Descripcion: string
  IdProfesor: number
  NameUsuario: string
}



export type ListMateriasByEstudianteResponse = MateriasByEstudianteResponse[]

export interface MateriasByEstudianteResponse {
  MateriaId: number
  Materia: string
  Profesor: string
}



export type ListGetAllMateriasEstudiantes = GetAllMateriasEstudiantes[]

export interface GetAllMateriasEstudiantes {
  Estudiante: string
  Email: string
  Profesor: string
}



