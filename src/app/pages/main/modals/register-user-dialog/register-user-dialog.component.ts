import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-user-dialog',
  templateUrl: './register-user-dialog.component.html',
  styleUrls: ['./register-user-dialog.component.scss']
})
export class RegisterUserDialogComponent implements OnInit {

  constructor(

    private userService : UserApiService,
    private matDialog : MatDialog
  ) { }

  ngOnInit(): void {
  }



  registerUser(data:any) {
    console.log(data.value)

    this.userService.createUser(
      {

        username:data.value.username,
        password:data.value.password,
        email:data.value.email,
        name:data.value.name,
        lastname:data.value.lastname,
        numberphone:data.value.numberphone,
        ci:data.value.ci,
        role_id: data.value.role_id
      }
    ).subscribe(res => {
      //TODO VALIDAR TODO EL FORMS Y RECIEN HACER LA PETICION POST
      console.log('post User ')
      this.matDialog.closeAll()
    })
  }
}
