import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from '../../../core/services/CookieService';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { ResposeModel } from '../../../core/models/ResposeModel';
import { TokenResponse } from '../Models/TokenResponse';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-loguin',
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  templateUrl: './loguin.component.html',
  styleUrl: './loguin.component.scss'
})
export class LoguinComponent {
  formLogin:FormGroup = new FormGroup({});
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80)
      ]),
      nombre: new FormControl('', [
      ]),
    });
  }

  sendLogin(){
    const {email,password} = this.formLogin.value;

    if (!!this.cookieService.check('appToken')) {
      this.router.navigate(['/']);
    } else{
      this.http.post<ResposeModel<TokenResponse>>(`${environment.apiLguin}`, {email,password}).subscribe(
        (response : ResposeModel<TokenResponse>)=>{
          if (response.body != null){
            let decodedJWT = JSON.parse(window.atob(response.body.accessToken.split('.')[1]));
                    let expireCookie = new Date(decodedJWT.exp * 1000);
                    this.cookieService.set(
                        'appToken',
                        response.body.accessToken,
                        expireCookie
                    );
                    this.router.navigate(['/']);
          }else{
            alert("Ocurrio un error")
          }
        }
      )
    }
  }

  Crear(){
    const {email,password,nombre} = this.formLogin.value;
    const contrasena = password;
    this.http.post<ResposeModel<string>>(`${environment.apiUsuarios}`, {email,contrasena,nombre}).subscribe(
      (response : ResposeModel<string>)=>{
        if (response.body != null){
          alert(response.body);
        }else{
          alert("Ocurrio un error")
        }
      }
    )
  }
}
