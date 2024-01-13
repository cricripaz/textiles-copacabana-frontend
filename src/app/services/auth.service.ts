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

  private URL = 'http://localhost:3000/api'


  signin(user:any){
    return this.http.post(`http://localhost:3000/api/user/signin`,user)
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
