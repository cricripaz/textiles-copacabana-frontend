import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { InventoryApiService } from "../../../../services/inventory-api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-weight-inventory',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-weight-inventory.component.html',
  styleUrls: ['./add-weight-inventory.component.scss']
})
export class AddWeightInventoryComponent implements OnInit {
  addWeightForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private matdialog: MatDialog,
    private inventoryService: InventoryApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.addWeightForm = this.fb.group({
      id: [this.data.dyeInventory_id],
      type: ['', Validators.required],
      weigth: ['', Validators.required]
    });
  }

  addWeigth() {
    if (this.addWeightForm.valid) {
      this.inventoryService.addQuantityWeight(this.addWeightForm.value).subscribe(() => {
        this.matdialog.closeAll();
        this.toastr.success(`Exito ,Cantidad Agregada : ${this.addWeightForm.value.weigth}`);
      }, () => {
        this.toastr.error('Error al agregar la cantidad.');
      });
    } else {
      this.toastr.error('Por favor llena Todos los campos');
    }
  }
}
