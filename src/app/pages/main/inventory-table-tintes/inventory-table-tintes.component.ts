import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InventoryApiService} from "../../../services/inventory-api.service";
import {RegisterDyeInventoryDialogComponent} from "./register-dye-inventory-dialog/register-dye-inventory-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {InventoryPopupComponent} from "./inventory-popup/inventory-popup.component";
import {EditInventoryComponent} from "./edit-inventory/edit-inventory.component";
import {data} from "autoprefixer";
import {AddWeightInventoryComponent} from "./add-weight-inventory/add-weight-inventory.component";
import {DeleteDialogComponent} from "../recipes/delete-dialog/delete-dialog.component";
import {DeleteInventoryComponent} from "./delete-inventory/delete-inventory.component";

@Component({
  selector: 'app-inventory-table-tintes',
  templateUrl: './inventory-table-tintes.component.html',
  styleUrls: ['./inventory-table-tintes.component.scss']
})
export class InventoryTableTintesComponent implements OnInit , AfterViewInit {

  inventoryData: any[] = [];
  dropdownStates: { [key: number]: boolean } = {};
  searchItem ='';
  currentPage: number = 1 ;
  itemsPerPage: number = 10;

  constructor(
    private matDialog:MatDialog ,
    private inventoryService : InventoryApiService
  ) { }

  ngOnInit(): void {

  this.showInventory()

  }

  ngAfterViewInit(): void {
    console.log('sss')
    console.log('length : ', this.inventoryData.length )
  }

  showInventory() {

    this.inventoryService.fetchInventory()
      .subscribe(data => {
        this.inventoryData = data && data.data ? data.data : []; // Check if data and data.data are defined
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
