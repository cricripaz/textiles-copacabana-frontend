import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {UserApiService} from "../../../../services/user-api.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {


  editUserForm! : FormGroup

  // myField = new FormControl(); Para hacer onchanges etc



  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userDataInject: any,
    private userService : UserApiService,
    private toastr : ToastrService,
    private matdialog : MatDialog
  )
  { }


  ngOnInit(): void {

    this.initializeForm();

  }

  roleMapping: { [key: string]: number } = {
    'admin': 1,
    'operador': 2
  };
  private initializeForm() {

    const roleValue = this.roleMapping[this.userDataInject.userdata.role.toLowerCase()]; // Convierte el texto a número

    this.editUserForm = this.fb.group({
      username:[this.userDataInject.userdata.username,[Validators.required , Validators.minLength(3)]],
      role_id:[roleValue],
      email:[this.userDataInject.userdata.email,[Validators.requiredTrue]],
      name:[this.userDataInject.userdata.name],
      lastname:[this.userDataInject.userdata.lastName],
      numberphone:[this.userDataInject.userdata.numberPhone],
      ci:[this.userDataInject.userdata.ci],
    })

  }

  editUser() {

    let id = this.userDataInject.userdata.user_id
    const formData = this.editUserForm.value
    this.userService.editUser(id, formData )
      .subscribe(
        () => {
          this.toastr.success('El usuario se editó exitosamente.', 'Éxito'); // Muestra el toastr de éxito
          this.matdialog.closeAll()
          //TODO update al array investigar
        },
        error => {
          this.toastr.error( error, 'Error'); // Muestra el toastr de error si ocurrió un error
        }
      );
  }



}
