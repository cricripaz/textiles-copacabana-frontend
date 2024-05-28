import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {ToastrService} from "ngx-toastr";
import {MaterialApiService} from "../../../../services/material-api.service";

@Component({
  selector: 'app-edit-material-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-material-dialog.component.html',
  styleUrl: './edit-material-dialog.component.scss'
})
export class EditMaterialDialogComponent implements OnInit{
  editMaterialForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public materialDataInject: any,
    private materialService : MaterialApiService,
    private toastr : ToastrService,
    private matdialog : MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()

    console.log(this.materialDataInject)
    }


  private initializeForm() {
    this.editMaterialForm = this.fb.group({
      name : [this.materialDataInject.name ],
      description : []
    })
  }
  editMaterial() {

    const id = this.materialDataInject.material_id
    const formdata = this.editMaterialForm.value

    this.materialService.editMaterial(id,formdata).subscribe(
      () => {
        this.toastr.success('Material Actualizado Exitosamente.', 'Éxito'); // Muestra el toastr de éxito
        this.matdialog.closeAll()
        //TODO update al array investigars
      },
      error => {
        this.toastr.error( error, 'Error'); // Muestra el toastr de error si ocurrió un error
      }
    )

  }
}
