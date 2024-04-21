import {Component, OnInit, ViewChild} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {RegisterUserDialogComponent} from "./register-user-dialog/register-user-dialog.component";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogUserComponent} from "./delete-dialog-userr/delete-dialog.component";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit  {

  usersData : any[] = []
  dropdownStates: { [key: number]: boolean } = {};
  searchUser = ''
  currentPage: number = 1 ;
  itemsPerPage: number = 10;


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


  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const inventoryLength = this.usersData ? this.usersData.length : 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > inventoryLength ? inventoryLength : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.usersData.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }


  openDialogRegisterUser() {

    const dialogRef = this.matDialog.open(RegisterUserDialogComponent)





  }

  showUsers(){

    this.userService.fetchUsers()
      .subscribe(data => {
        this.usersData = data && data.users ? data.users : []; // Verifica si data y data.data están definidos
        // Filtrar los usuarios activos después de asignar los datos
        this.usersData = this.usersData.filter((user: any) => user.state == 'active');
        //TODO modificar el backend ya filtrados
      })


  }


  editUser(user : any) {
    console.log(user)
    this.matDialog.open(EditUserDialogComponent,
      {
        data : {
          userdata : user

        }
      })



  }


  openDialogDeleteUser(user : any){

    this.matDialog.open(DeleteDialogUserComponent,{data:user})

  }
  deleteUser(users:any): void {

    // this.userService.deleteUser(userId).subscribe(() => {
    //   // Eliminar el usuario del arreglo local después de la eliminación exitosa
    //
    //   this.usersData.splice(index, 1);
    //
    //   this.toastr.success('Usuario Eliminado Correctamente')
    //
    // }, error => {
    //   console.error('Error al eliminar usuario:', error);
    // });

  }

  handleUserDeleted(userId: number) {
    const index = this.usersData.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.usersData.splice(index, 1);
      this.toastr.success('Usuario Eliminado Correctamente');
    }
  }

  openModalInfoUser(users: any) {
      //TODO Implementar
  }
}
