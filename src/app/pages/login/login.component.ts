import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username : 'cricripaz',
    password : 'pass123'
  }

  //TODO IMPLENTAR REACTIVE FORMS para login

  constructor(
    private authService : AuthService ,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    console.log(this.user)
    this.authService.signin(this.user).subscribe( (res:any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
      console.log('res token',res.token)
      this.router.navigate(['main'])
    }, (error) => {
      //TODO mejorar la alerta con material DESIGN
      // Manejar el error aquí
      console.error('Error en el inicio de sesión:', error);
      // Muestra una alerta al usuario
      alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    })
  }
}
