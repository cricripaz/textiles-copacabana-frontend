import {Component, OnInit, ViewChild} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {RegisterUserDialogComponent} from "./register-user-dialog/register-user-dialog.component";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogUserComponent} from "./delete-dialog-userr/delete-dialog.component";
import {UserPopupComponent} from "./user-popup/user-popup.component";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit  {

  usersData : any[] = []


  searchUser = ''
  currentPage: number = 1 ;
  itemsPerPage: number = 10;
  dropdownVisible: boolean = false;
  selectedStatuses: Set<string> = new Set();

  @ViewChild('DataEditUserForm') dataEditUserForm!: NgForm;


  constructor(
      private userService : UserApiService,
      private matDialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.showUsers()

  }


  showUsers() {
    this.userService.fetchUsers()
      .subscribe(data => {
        this.usersData = data && data.users ? data.users : []; // Verifica si data y data.users están definidos

        // Filtrar los usuarios activos
        this.usersData = this.usersData.filter((user: any) => user.state === 'active');

        // Ordenar los usuarios por `user_id` en orden descendente
        this.usersData.sort((a: any, b: any) => b.user_id - a.user_id);

        console.log(this.usersData);

        // TODO: modificar el backend ya filtrados
      });
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
  openDialogRegisterUser() {
   this.matDialog.open(RegisterUserDialogComponent).afterClosed().subscribe( (res) => {

     if (res.message === 'success') {
       // Mapea los `role_id` a los nombres de rol
       const roles: { [key: number]: string } = {
         1: 'admin',
         2: 'operador',
         3: 'tintor'
       };

       // Asigna el rol usando el mapeo
       res.user.role = roles[res.user.role_id] || 'desconocido';

       // Añade el usuario al inicio de `usersData`
       this.usersData.unshift(res.user);
     }

   })

  }

  openDialogDeleteUser(user : any , index: number){
    console.log('index',index)
    this.matDialog.open(DeleteDialogUserComponent,{data:user}).afterClosed().subscribe((res) => {
      console.log('res After ',res )
      if (res == 'yes' ){
        this.usersData.splice(index, 1)
      }
    })

  }



  openModalInfoUser(users: any) {
      this.matDialog.open(UserPopupComponent,{data : users})
  }


  //PAGINATION



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

  getCurrentPageItems() {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.usersData ? this.usersData.slice(initialIndex, finalIndex) : [];
  }

  getEmptyRows(): any[] {
    const itemsShown = this.usersData.slice(this.calculateInitialIndex(), this.calculateFinalIndex()).length;
    const emptyRowsCount = this.itemsPerPage - itemsShown;
    return Array(emptyRowsCount).fill(null);
  }


}
