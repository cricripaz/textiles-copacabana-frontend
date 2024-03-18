import {Component, OnInit, ViewChild} from '@angular/core';
import {initFlowbite} from "flowbite";
import {UserApiService} from "../../../services/user-api.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterUserDialogComponent} from "../modals/register-user-dialog/register-user-dialog.component";
import {EditUserDialogComponent} from "../modals/edit-user-dialog/edit-user-dialog.component";
import {DeleteConfirmationUserComponent} from "../modals/delete-confirmation-user/delete-confirmation-user.component";
import {DialogService} from "../../../services/dialog.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit  {

  showModal: boolean = false;
  usersData : any
  dropdownStates: { [key: number]: boolean } = {};
  searchUser = ''


  @ViewChild('DataEditUserForm') dataEditUserForm!: NgForm;



  toggleDropdown(index: number): void {
    this.dropdownStates[index] = !this.dropdownStates[index];
  }
  constructor(
      private userService : UserApiService,
      private matDialog:MatDialog ,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showUsers()
  }

  openDialogRegisterUser() {
    //TODO preguntar donde va el toastr si aqui o en el service
    this.matDialog.open(RegisterUserDialogComponent)

    this.showUsers()
  }

  showUsers(){
    this.userService.fetchUsers()
      .subscribe(data => {
        this.usersData = data
        console.log(this.usersData)
        this.usersData = this.usersData.users
      })

  }
  editUser(user : any) {

    this.matDialog.open(EditUserDialogComponent,{data : user})



  }

  openDialogDeleteUser(){
    this.matDialog.open(DeleteConfirmationUserComponent)

  }
  deleteUser(index: number): void {

    const userId = this.usersData[index].user_id; // Obtener el ID del usuario

    this.userService.deleteUser(userId).subscribe(() => {
      // Eliminar el usuario del arreglo local después de la eliminación exitosa

      this.usersData.splice(index, 1);

      this.toastr.success('Usuario Eliminado Correctamente')

    }, error => {
      console.error('Error al eliminar usuario:', error);
    });
  }
}
