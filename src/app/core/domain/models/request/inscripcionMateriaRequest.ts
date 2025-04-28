export interface InscripcionMateriaRequest {
  IdEstudiante: number | undefined
  Materias: InscripcionMateriasRequest[]
}

export interface InscripcionMateriasRequest {
  IdMateriaProfesor: number
  IdProfesor: number
}
