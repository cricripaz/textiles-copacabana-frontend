import {Component, OnInit, ViewChild} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterUserDialogComponent} from "./register-user-dialog/register-user-dialog.component";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {DeleteConfirmationUserComponent} from "./delete-confirmation-user/delete-confirmation-user.component";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  ngAfterViewInit(): void {
    console.log('length : ', this.usersData.length )
  }



  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const inventoryLength = this.usersData ? this.usersData.length : 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > inventoryLength ? inventoryLength : endIndex;
  }

  getCurrentPageItems(): any[] {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.usersData ? this.usersData.slice(initialIndex, finalIndex) : [];
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


    dialogRef.componentInstance.registrationCompletedSuccesfull.subscribe(
      ()=> {
        //TODO Preguntar acerca de event emmiter
        console.log('test EVENEMMITER')
      })


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


  editUser(user : any , index :number) {
    const userId = this.usersData[index].user_id;
    this.matDialog.open(EditUserDialogComponent,
      {
        data : {
          userdata : user,
          userid : userId
        }
      })



  }

  openDialogDeleteUser(){

    //TODO implentar mensaje de advertencia y data del userID

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
