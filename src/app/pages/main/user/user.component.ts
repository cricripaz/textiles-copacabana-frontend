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


  @ViewChild('DataEditUserForm') dataEditUserForm!: NgForm;


  constructor(
      private userService : UserApiService,
      private matDialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.showUsers()

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
  openDialogRegisterUser() {
   this.matDialog.open(RegisterUserDialogComponent).afterClosed().subscribe( (res) => {
     //TODO Implementarlo de mejor manera y verificar los parametros
     if(res.message == 'success'){
       this.usersData.push(res.user)
     }


   })

  }

  openDialogDeleteUser(user : any , index: number){
    console.log('index',index)
    this.matDialog.open(DeleteDialogUserComponent,{data:user}).afterClosed().subscribe((res) => {
      console.log('res After ',res )})
       this.usersData.splice(index, 1)
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
