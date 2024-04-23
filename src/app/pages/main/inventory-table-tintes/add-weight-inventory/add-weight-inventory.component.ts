import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InventoryApiService} from "../../../../services/inventory-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-weight-inventory',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-weight-inventory.component.html',
  styleUrl: './add-weight-inventory.component.scss'
})
export class AddWeightInventoryComponent implements OnInit{
  addWeightForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any ,
    private fb : FormBuilder,
    private matdialog : MatDialog,
    private inventoryservice : InventoryApiService,
    private toastr : ToastrService
  ) {
  }

  ngOnInit(): void {

    this.initializeForm()
    }



    private initializeForm (){
    this.addWeightForm = this.fb.group({
      id:[this.data.dyeInventory_id],
      type:[''],
      weigth:['']
    })
    }

  addWeigth() {

    if (this.addWeightForm.valid){

      console.log(this.addWeightForm.value)

      this.inventoryservice.addQuantityWeight(this.addWeightForm.value).subscribe( () => {

        this.matdialog.closeAll()

        this.toastr.success(`Exito ,Cantidad Agregada : ${this.addWeightForm.value.weigth}`)

        //TODO update values weight parent
      })


    }else {

      this.toastr.error('Por favor llena Todos los campos')

    }


  }
}
