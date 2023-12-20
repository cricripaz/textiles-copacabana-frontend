import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  usernames = '';
  constructor() { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    // Verificar si el token existe antes de intentar decodificar
    if (token) {
      try {
        // Utilizar el operador de aserción de tipo para decirle a TypeScript que confíe en el tipo de decodedToken
        const decodedToken: any = jwt_decode(token);
        console.log(decodedToken)
        // Verificar si la propiedad 'role_id' existe antes de acceder a ella
        if (decodedToken && decodedToken.username) {
          this.usernames = decodedToken.username;
          console.log('User Name : ', this.usernames)
        } else {
          console.error('El token no contiene la propiedad "role_id".');
        }
      } catch (error) {

        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró el token en el almacenamiento local.');
    }
  }


}
