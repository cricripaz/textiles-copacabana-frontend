import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {InventoryApiService} from "../../../../services/inventory-api.service";

@Component({
  selector: 'app-edit-inventory',
  standalone: true,
    imports: [
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.scss'
})
export class EditInventoryComponent implements OnInit{
  inventoryForm!: FormGroup;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private matdialog : MatDialog,
    private inventoryService : InventoryApiService
  ) {
  }
  ngOnInit(): void {
    console.log('data:',this.data)
    this.initializeForm()
  }


  private initializeForm (){


    this.inventoryForm = this.fb.group({
      name: [this.data.name,Validators.required],
      type: [this.data.dyeType],
      weight: [this.data.weight,Validators.required],
      description: [this.data.description,Validators.required],
    })

  }
  EditDyeInventory() {

    let id = this.data.dyeInventory_id

    const formData = this.inventoryForm.value



    this.inventoryService.editItemInventory(id,formData)
      .subscribe(
        () => {
          this.toastr.success('El Item se editó exitosamente.', 'Éxito'); // Muestra el toastr de éxito
          this.matdialog.closeAll()
          //TODO update al array investigar
        },
        error => {
          this.toastr.error( error.error, 'Error'); // Muestra el toastr de error si ocurrió un error
          console.log(error.error)
        }
      );
  }


}
