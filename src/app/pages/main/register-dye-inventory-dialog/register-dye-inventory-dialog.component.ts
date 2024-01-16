import { Component, OnInit } from '@angular/core';
import {InventoryApiService} from "../../../services/inventory-api.service";
import jwt_decode from "jwt-decode";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register-dye-inventory-dialog',
  templateUrl: './register-dye-inventory-dialog.component.html',
  styleUrls: ['./register-dye-inventory-dialog.component.scss']
})
export class RegisterDyeInventoryDialogComponent implements OnInit {

  user_id = 0

  constructor(
    private matDialog:MatDialog,
    private inventoryService : InventoryApiService
  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');

    // Verificar si el token existe antes de intentar decodificar
    if (token) {
        const decodedToken: any = jwt_decode(token);
        console.log(decodedToken)
        // Verificar si la propiedad 'role_id' existe antes de acceder a ella
        if (decodedToken && decodedToken.user_id) {
          this.user_id = decodedToken.user_id;
          console.log('user_id : ', this.user_id)
        } else {
          console.error('El token no contiene la propiedad "role_id".');
        }
    }


  }

  registerDyeInventory(data:any) {
    console.log('test button', data.value.name)
    this.inventoryService.createDyeInventory(
      {
        name:data.value.name,
        type: data.value.type,
        user_id: this.user_id,
        weigth: data.value.weigth,
        description: data.value.description
    }
    ).subscribe(res => {
      console.log('post ')
      this.matDialog.closeAll()
    })
  }
}
