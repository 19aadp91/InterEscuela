import { GetEstudiantesMateria } from "./GetEstudiantesMateria";

export interface GetEstudiante {
    nombre: string;
    email: string;
    habilitado: boolean;
    materias: GetEstudiantesMateria[];
  }