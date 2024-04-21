import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {UserApiService} from "../../../../services/user-api.service";
import {ToastrService} from "ngx-toastr";
import {data} from "autoprefixer";

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
    private matdialog : MatDialog
  ) {
  }

  deleteRecipe() {

    let id = this.data.user_id;

    this.userServices.deleteUser(id).subscribe(()=>{
      this.matdialog.closeAll()
      this.toastr.success('Usuario Eliminado Correctamente');
        //TODO implementar el splice data del delete user
    },error => {
      this.toastr.error('Error al eliminar receta:', error)
      }
    )

  }
}
