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

  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  lastname: string = '';
  numberphone: number | null = null;
  ci: number | null = null;
  role: string = '';

  constructor(

    private userService : UserApiService,
    private dialoRef : MatDialogRef<RegisterUserDialogComponent>,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  }



  registerUser(data:any) {

    if (data.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente.');
      return;
    }
    console.log(data.value)

    const datauser = {
      username:data.value.username,
      password:data.value.password,
      email:data.value.email,
      name:data.value.name,
      lastname:data.value.lastname,
      numberphone:data.value.numberphone,
      ci:data.value.ci,
      role: data.value.role
    }

    this.userService.createUser(datauser).subscribe( (res)=> {


      this.dialoRef.close({user : res , message : 'success'})

    })
  }



}
