import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http : HttpClient,
              private jwtHelper : JwtHelperService,
              private _router : Router
  ) { }


  baseurl= environment.baseUrl

  signin(user:any){
    console.log(this.baseurl)
    return this.http.post(`${this.baseurl}/user/login`,user)
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
