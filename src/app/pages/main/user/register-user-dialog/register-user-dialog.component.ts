import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-user-dialog',
  templateUrl: './register-user-dialog.component.html',
  styleUrls: ['./register-user-dialog.component.scss']
})
export class RegisterUserDialogComponent implements OnInit {
  constructor(

    private userService : UserApiService,
    private dialoRef : MatDialogRef<RegisterUserDialogComponent>,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  }



  registerUser(data:any) {
    console.log(data.value)

    const datauser = {
      username:data.value.username,
      password:data.value.password,
      email:data.value.email,
      name:data.value.name,
      lastname:data.value.lastname,
      numberphone:data.value.numberphone,
      ci:data.value.ci,
      role_id: data.value.role_id
    }

    this.userService.createUser(datauser).subscribe( ()=> {
      //TODO VALIDAR TODO EL FORMS Y RECIEN HACER LA PETICION POST
        this.dialoRef.close({user : datauser , message : 'success'})


    })
  }
}
