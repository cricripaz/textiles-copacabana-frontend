import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {UserApiService} from "../../../../services/user-api.service";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  editUserData! : any
  editUserForm! : FormGroup
  indexUser! : number
  // myField = new FormControl(); Para hacer onchanges etc



  constructor(
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userDataInject: any,
    private userService : UserApiService,
    private toastr : ToastrService,
    private dialogEdituser: MatDialogRef<EditUserDialogComponent>
  )
  { }


  ngOnInit(): void {

   this.editUserData = this.userDataInject['userdata'];
   this.indexUser = this.userDataInject['userid']

   this.editUserForm = this.initForm()


  }


  initForm():FormGroup{

    return this.formBuilder.group({

      //[valores,validators,]
      username:[this.editUserData.username,[Validators.required , Validators.minLength(3)]],
      role_id:[this.editUserData.role],
      email:[this.editUserData.email,[Validators.requiredTrue]],
      name:[this.editUserData.name],
      lastname:[this.editUserData.lastName],
      numberphone:[this.editUserData.numberPhone],
      ci:[this.editUserData.ci],
    })


  }

  editUser() {
    //TODO modificar el HTML al enviar values y que no amnde string en VALUE , Ver porque no nos llega el mensaje del backend
    this.userService.editUser(this.indexUser, this.editUserForm.value)
      .subscribe(
        () => {
          this.toastr.success('El usuario se editó exitosamente.', 'Éxito'); // Muestra el toastr de éxito

          this.dialogEdituser.close()

        },
        error => {
          this.toastr.error( error.error.message, 'Error'); // Muestra el toastr de error si ocurrió un error
        }
      );
  }

  editUser2( ) {

    this.userService.editUser( this.indexUser,this.editUserForm.value)

  }
}
