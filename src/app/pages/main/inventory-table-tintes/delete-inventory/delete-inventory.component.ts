import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {InventoryApiService} from "../../../../services/inventory-api.service";

@Component({
  selector: 'app-delete-inventory',
  standalone: true,
    imports: [
        MatDialogModule
    ],
  templateUrl: './delete-inventory.component.html',
  styleUrl: './delete-inventory.component.scss'
})

export class DeleteInventoryComponent implements OnInit{


  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private toastr : ToastrService,
    private matdialog : MatDialog,
    private inventoryService : InventoryApiService
  ) {
  }

  ngOnInit(): void {

  }


  deleteItemInventory() {

    const id = this.data.dyeInventory_id

    this.inventoryService.deleteItemInventory(id).subscribe( () =>{
      this.matdialog.closeAll()
      this.toastr.success('Item del inventario Eliminado Correctamente');
      //TODO implementar el splice data del delete user
    },error => {
      this.toastr.error('Error al eliminar el item :', error)
    })

  }
}
