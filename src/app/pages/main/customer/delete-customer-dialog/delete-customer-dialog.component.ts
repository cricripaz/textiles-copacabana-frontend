import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DeleteDialogComponent} from "../../recipes/delete-dialog/delete-dialog.component";
import {CustomerApiService} from "../../../../services/customer-api.service";

@Component({
  selector: 'app-delete-customer-dialog',
  standalone: true,
    imports: [
        MatDialogModule
    ],
  templateUrl: './delete-customer-dialog.component.html',
  styleUrl: './delete-customer-dialog.component.scss'
})
export class DeleteCustomerDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService : CustomerApiService,
    private toastr : ToastrService,
    public dialogRef : MatDialogRef<DeleteDialogComponent>
  ) {
  }

  deleteCustomer() {

    const id = this.data.customer_id;

    this.customerService.deleteUser(id).subscribe(() => {
      this.toastr.success('Cliente Eliminado Exitosamente');

      this.dialogRef.close("yes")
    },error => {
      this.toastr.error('Error Al Eliminar Cliente:', error)
    })

  }
}
