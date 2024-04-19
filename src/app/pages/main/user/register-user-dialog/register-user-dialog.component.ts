import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-register-user-dialog',
  templateUrl: './register-user-dialog.component.html',
  styleUrls: ['./register-user-dialog.component.scss']
})
export class RegisterUserDialogComponent implements OnInit {
  @Output() registrationCompletedSuccesfull = new EventEmitter<void>();
  constructor(

    private userService : UserApiService,
    private matDialog : MatDialog
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

    this.userService.createUser(datauser).subscribe(res => {
      //TODO VALIDAR TODO EL FORMS Y RECIEN HACER LA PETICION POST
      console.log('post User ')
      this.matDialog.closeAll()
      this.registrationCompletedSuccesfull.emit()
    })
  }
}
