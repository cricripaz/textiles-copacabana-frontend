import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {navbarData} from "./navDataMain";
import {navDataOp} from "./navDataOp";
import jwt_decode from 'jwt-decode';


import decode from 'jwt-decode';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  navData = navbarData;
  navDataOp = navDataOp;
  role_id: number = 0;
  snav: MatSidenav | undefined;


//TODO seleccionar rol par apoder cargar la vista por role id almacenado en local storage

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  // Otros miembros y lógica del componente...

  // Referencia al mat-sidenav
  @ViewChild('drawer') drawer!: MatSidenav;

  // Función para manejar el clic en un elemento del menú
  handleItemClick(): void {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        this.drawer.close(); // Cierra el menú en dispositivos móviles
      }
    });
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    // Verificar si el token existe antes de intentar decodificar
    if (token) {
      try {
        // Utilizar el operador de aserción de tipo para decirle a TypeScript que confíe en el tipo de decodedToken
        const decodedToken: any = jwt_decode(token);

        // Verificar si la propiedad 'role_id' existe antes de acceder a ella
        if (decodedToken && decodedToken.role_id) {
          this.role_id = decodedToken.role_id;
          console.log('Tipo de rol : ', this.role_id)
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





  constructor(
    private breakpointObserver: BreakpointObserver,
   private authService : AuthService
    ) {



  }


  logOut() {
    this.authService.logout()
  }
}
