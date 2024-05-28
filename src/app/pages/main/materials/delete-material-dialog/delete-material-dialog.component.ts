import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MaterialApiService} from "../../../../services/material-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-material-dialog',
  standalone: true,
    imports: [
        MatDialogModule
    ],
  templateUrl: './delete-material-dialog.component.html',
  styleUrl: './delete-material-dialog.component.scss'
})
export class DeleteMaterialDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private materialService : MaterialApiService,
    private toastr : ToastrService,
    private dialogRef : MatDialogRef<DeleteMaterialDialogComponent>
  ) {
  }
  deleteMaterial() {
    console.log(this.data)
    const id  = this.data.material_id;

    this.materialService.deleteMaterial(id).subscribe( () => {
      this.toastr.success('Material Eliminado Exitosamente');

      this.dialogRef.close("yes")

    },error => {
      this.toastr.error('Error Al Eliminar Material:', error)

    })

  }
}
