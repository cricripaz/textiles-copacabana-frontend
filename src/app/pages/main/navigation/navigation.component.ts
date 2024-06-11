import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {navbarData} from "./navDataMain";
import {navDataOp} from "./navDataOp";
import jwt_decode from 'jwt-decode';



import {AuthService} from "../../../services/auth.service";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  navDataOp = navDataOp;
  navData = navbarData;
  role_id: number = 0;
  username: string = '';
  lastname: string = '';
  activeItem: string = '';

  setActiveItem(item: string) {
    this.activeItem = item;
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    initFlowbite();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        if (decodedToken && decodedToken.role_id) {
          this.role_id = decodedToken.role_id;
          this.username = decodedToken.username;
          console.log('Tipo de rol : ', this.role_id);
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

  logOut() {
    this.authService.logout();
  }

  getNavData() {
    if (this.role_id === 1) {
      return this.navData;
    } else if (this.role_id === 2) {
      return this.navData;
    } else {
      return [];
    }
  }
}
