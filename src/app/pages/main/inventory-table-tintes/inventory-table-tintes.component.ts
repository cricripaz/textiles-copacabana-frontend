import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InventoryApiService} from "../../../services/inventory-api.service";
import {RegisterDyeInventoryDialogComponent} from "./register-dye-inventory-dialog/register-dye-inventory-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {InventoryPopupComponent} from "./inventory-popup/inventory-popup.component";
import {EditInventoryComponent} from "./edit-inventory/edit-inventory.component";
import {AddWeightInventoryComponent} from "./add-weight-inventory/add-weight-inventory.component";
import {DeleteInventoryComponent} from "./delete-inventory/delete-inventory.component";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-inventory-table-tintes',
  templateUrl: './inventory-table-tintes.component.html',
  styleUrls: ['./inventory-table-tintes.component.scss']
})
export class InventoryTableTintesComponent implements OnInit  {

  inventoryData: any[] = [];
  dropdownStates: { [key: number]: boolean } = {};
  searchItem ='';
  currentPage: number = 1 ;
  itemsPerPage: number = 15;
  role_id!: number;

  constructor(
    private matDialog:MatDialog ,
    private inventoryService : InventoryApiService
  ) { }

  ngOnInit(): void {

  this.showInventory()
  this.getRolebyToken()
  }
  getRolebyToken (){
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        if (decodedToken && decodedToken.role_id) {
          this.role_id = decodedToken.role_id;
          console.log('Tipo de rol : ', this.role_id,decodedToken);
        } else {
          console.error('El token no contiene la propiedad "role_id".');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró el token en el almacenamiento local.');
    }
  }

  showInventory() {

    this.inventoryService.fetchInventory()
      .subscribe(data => {
        this.inventoryData = data && data.data ? data.data : [];
        console.log(this.inventoryData)
      });
  }


  openDialogRegisterDye(){
    this.matDialog.open(RegisterDyeInventoryDialogComponent)
  }


  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const inventoryLength = this.inventoryData ? this.inventoryData.length : 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > inventoryLength ? inventoryLength : endIndex;
  }


  getCurrentPageItems(): any[] {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.inventoryData ? this.inventoryData.slice(initialIndex, finalIndex) : [];
  }


  getTotalPages(): number {
    return Math.ceil(this.inventoryData.length / this.itemsPerPage);
  }


  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }


  openModalItemInventory(item: any) {
    this.matDialog.open(InventoryPopupComponent,{data : item})
  }

  editItemInventory(item: any) {
    this.matDialog.open(EditInventoryComponent,{data : item})

  }

  openDialogDeleteItemInventory(item: any) {
    this.matDialog.open(DeleteInventoryComponent, {data : item})
  }

  addQuantityItem(item: any) {
    this.matDialog.open(AddWeightInventoryComponent,{data : item})
  }


}
