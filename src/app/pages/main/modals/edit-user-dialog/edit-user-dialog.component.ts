import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {UserApiService} from "../../../../services/user-api.service";



@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  editUserData! : any
  editUserForm! : FormGroup
  // myField = new FormControl(); Para hacer onchanges etc



  constructor(
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userDataInject: any,
    userService : UserApiService
  )
  { }


  ngOnInit(): void {

   this.editUserData = this.userDataInject;
   this.editUserForm = this.initForm()
    console.log(this.editUserData)

  }


  initForm():FormGroup{

    return this.formBuilder.group({
      //[valores,validators,]
      username:[this.editUserData.username,[Validators.required , Validators.minLength(3)]],
      email:[this.editUserData.email,[Validators.requiredTrue]],
      name:[this.editUserData.name],
      lastname:[this.editUserData.lastName],
      numberphone:[this.editUserData.numberPhone],
      ci:[this.editUserData.ci],
      role_id:[this.editUserData.role_id],
    })


  }

  editUser() {
    console.log('form : ',this.editUserForm.value)
  }
}
