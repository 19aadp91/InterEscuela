import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetEstudiante } from '../../estudiantes/Models/GetEstudiante';
import { ResposeModel } from '../../../core/models/ResposeModel';
import { environment } from '../../../../environments/environment';
import { GetEstudiantesMateria } from '../../estudiantes/Models/GetEstudiantesMateria';
import { GetMateria } from '../Models/GetMateria';

@Component({
  selector: 'app-mi-usuario',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './mi-usuario.component.html',
  styleUrl: './mi-usuario.component.scss'
})
export class MiUsuarioComponent {

  estudiantes: GetEstudiante|null = null;
  actualizar : boolean = false;
  materias : GetMateria[] = [];

  form:FormGroup = new FormGroup({});

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetEstudiante();
    this.GetMateria();
  }

  agregarElemento() {
    if(this.elementos.length < 3){
      const elemento = new FormGroup({
        idMateria: new FormControl('', [
          Validators.required
        ]),
      });
      this.elementos.push(elemento);
    }
  }

  get elementos(): FormArray {
    return this.form.get('elementos') as FormArray;
  }

  eliminarElemento(index: number) {
    this.elementos.removeAt(index);
  }

  GetEstudiante() {
      this.http.get<ResposeModel<GetEstudiante>>(`${environment.apiUsuarios}/estudiante`).subscribe(
        (response: ResposeModel<GetEstudiante>) => {
          if (response.body != null) {
            this.estudiantes = response.body;
            this.form = new FormGroup({
              nombre: new FormControl(this.estudiantes?.nombre, [
                Validators.required,
              ]),
              contasena: new FormControl(null, [
              ]),
              elementos: new FormArray([])
            });
            if(this.estudiantes.materias.length > 0){
              for (let index = 0; index < this.estudiantes.materias.length; index++) {
                const elemento = new FormGroup({
                  idMateria: new FormControl(this.estudiantes.materias[index].idMateria, [
                    Validators.required
                  ]),
                });
                this.elementos.push(elemento);
              }
            }
          } else {
            alert(response.errors![0].message)
          }
        }
      );
      
    }

    GetMateria(){
      this.http.get<ResposeModel<GetMateria[]>>(`${environment.apiUsuarios}/Materia`).subscribe(
        (response: ResposeModel<GetMateria[]>) => {
          if (response.body != null) {
            this.materias = response.body;
          } else {
            alert(response.errors![0].message)
          }
        }
      );
    }

    companeros(companeros: GetEstudiantesMateria): string {
        return companeros.compañeros.length > 0 
        ? companeros.compañeros.map(x => x).join(', ') 
        : "Aun no tienes compañeros";
    }

    Actualizar(){
      this.actualizar = true;
    }

    Salir(){
      this.actualizar = false;
    }

    enviar(){
      const {nombre,contasena} = this.form.value;

      const materias: string[] = [];

      for (let i = 0; i < this.elementos.length; i++){
        const elemento = this.elementos.at(i);
        materias.push(elemento.get('idMateria')?.value);
      }

      this.http.put<ResposeModel<GetMateria[]>>(`${environment.apiUsuarios}`,{nombre,contasena,materias}).subscribe(
        (response: ResposeModel<GetMateria[]>) => {
          if (response.body != null) {
            this.GetEstudiante();
            this.actualizar = false;
          } else {
            alert(response.errors![0].message)
          }
        })

    }
}
