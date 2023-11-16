import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,
  private jwtHelper : JwtHelperService) { }

  private URL = 'https://textiles-copacabana-backend-production.up.railway.app'

  signin(user:any){
    return this.http.post(`${this.URL}/user/singin`,user)
  }


  isAuth():boolean{

    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }


}
