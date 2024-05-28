import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ColorApiService} from "../../../../services/color-api.service";

@Component({
  selector: 'app-delete-color-dialog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './delete-color-dialog.component.html',
  styleUrl: './delete-color-dialog.component.scss'
})
export class DeleteColorDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private colorService : ColorApiService,
    private toastr : ToastrService,
    private dialogRef : MatDialogRef<DeleteColorDialogComponent>
  ) {
  }
  deleteColor() {
    console.log(this.data)
    const id  = this.data.color_id;

    this.colorService.deleteColor(id).subscribe( () => {
      this.toastr.success('Color Eliminado Exitosamente');

      this.dialogRef.close("yes")

    },error => {
      this.toastr.error('Error Al Eliminar Color:', error)

    })

  }
}
