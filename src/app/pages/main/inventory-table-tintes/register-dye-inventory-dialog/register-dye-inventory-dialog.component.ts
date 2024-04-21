import { Component, OnInit } from '@angular/core';
import {InventoryApiService} from "../../../../services/inventory-api.service";
import jwt_decode from "jwt-decode";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-dye-inventory-dialog',
  templateUrl: './register-dye-inventory-dialog.component.html',
  styleUrls: ['./register-dye-inventory-dialog.component.scss']
})
export class RegisterDyeInventoryDialogComponent implements OnInit {

  user_id = 0
  inventoryForm!: FormGroup;

  constructor(
    private matDialog:MatDialog,
    private inventoryService : InventoryApiService,
    private fb : FormBuilder,
    private toastr : ToastrService
  ) { }


  ngOnInit(): void {




    const token = localStorage.getItem('token');

    // Verificar si el token existe antes de intentar decodificar
    if (token) {
        const decodedToken: any = jwt_decode(token);
        console.log(decodedToken)
        if (decodedToken && decodedToken.user_id) {
          this.user_id = decodedToken.user_id;
          console.log('user_id : ', this.user_id)
        } else {
          console.error('El token no contiene la propiedad "role_id".');
        }
    }
    this.initializeForm()

  }

  private initializeForm(){
    this.inventoryForm = this.fb.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      user_id: [this.user_id],
      weigth: ['',Validators.required],
      description: ['',Validators.required],
    })
  }
  registerDyeInventory() {
    console.log(this.inventoryForm.value)
    if (this.inventoryForm.valid){
      this.inventoryService.createDyeInventory(this.inventoryForm.value).subscribe(() =>{
        this.matDialog.closeAll()
        this.toastr.success('Tinte registrado exitosamente')
      })
    }else{
      this.toastr.error('Por favor llena Todos los campos')
    }

  }

}
