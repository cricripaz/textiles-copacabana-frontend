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
    username : 'cristianpaz',
    password : 'pass123'
  }

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
      this.router.navigate(['main'])
    })
  }
}
