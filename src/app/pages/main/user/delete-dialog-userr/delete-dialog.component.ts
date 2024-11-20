import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {UserApiService} from "../../../../services/user-api.service";
import {ToastrService} from "ngx-toastr";
import {data} from "autoprefixer";
import {DeleteDialogComponent} from "../../recipes/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-delete-dialog-user',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogUserComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServices : UserApiService,
    private toastr : ToastrService,
    public dialogRef : MatDialogRef<DeleteDialogComponent>
  ) {
  }

  deleteRecipe() {


    let id = this.data.user_id;

    this.userServices.deleteUser(id).subscribe(()=>{

      this.toastr.success(`Usuario: ${id} Eliminado Correctamente`);

        this.dialogRef.close("yes")

    },error => {
      this.toastr.error('Error al eliminar Usuario:', error)
      }
    )

  }
}
