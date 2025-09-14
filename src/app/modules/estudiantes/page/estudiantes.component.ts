import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResposeModel } from '../../../core/models/ResposeModel';
import { GetEstudiante } from '../Models/GetEstudiante';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-estudiantes',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {

  estudiantes: GetEstudiante[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetEstudiante();
  }

  GetEstudiante() {
    this.http.get<ResposeModel<GetEstudiante[]>>(`${environment.apiUsuarios}/estudiantes`).subscribe(
      (response: ResposeModel<GetEstudiante[]>) => {
        if (response.body != null) {
          this.estudiantes = response.body;
        } else {
          alert(response.errors![0].message)
        }
      }
    );
  }

  calcularTotalCreditos(estudiante: GetEstudiante): number {
    return estudiante.materias.reduce((total, materia) => total + materia.creditos, 0);
  }

  obtenerNombresMaterias(estudiante: GetEstudiante): string {
    return estudiante.materias.length > 0 
      ? estudiante.materias.map(materia => materia.nombre).join(', ') 
      : "No tiene materias asignadas";
  }
}
