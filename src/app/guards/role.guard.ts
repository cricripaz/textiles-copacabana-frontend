import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor( private authService:AuthService , public router:Router) {

  }
  canActivate(route : ActivatedRouteSnapshot) : boolean{

    const expectedRole = route.data['expectedRole'];

   // @ts-ignore
    const token : string = localStorage.getItem('token')

    //TODO can activate child by rol

    console.log(decode(token))


    return true;


  }


}
