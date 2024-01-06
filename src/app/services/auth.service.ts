import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http : HttpClient,
              private jwtHelper : JwtHelperService,
              private _router : Router
  ) { }

  private URL = 'https://textiles-copacabana-backend-production.up.railway.app'


  signin(user:any){
    return this.http.post(`${this.URL}/user/singin`,user)
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  isAuth():boolean{

    const token = localStorage.getItem('token');

    return !(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token'));

  }


}
