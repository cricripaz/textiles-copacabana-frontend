import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {data} from "autoprefixer";
import {OrdersApiService} from "../../../../services/orders-api.service";
import {ToastrService} from "ngx-toastr";
import {Order} from "../../../../models/order.model";

@Component({
  selector: 'app-delete-order-dialog',
  standalone: true,
    imports: [
        MatDialogModule
    ],
  templateUrl: './delete-order-dialog.component.html',
  styleUrl: './delete-order-dialog.component.scss'
})
export class DeleteOrderDialogComponent{


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order,
   private orderService : OrdersApiService,
    private toastr : ToastrService,
    private dialogRef : MatDialogRef<DeleteOrderDialogComponent>
  ) {
  }
  deleteOrder() {
    const id = this.data.order_id;

    this.orderService.deleteOrder(id).subscribe( () => {

      this.toastr.success('Orden Eliminada Exitosamente');

      this.dialogRef.close("yes")

    },error => {

      this.toastr.error('Error Al Eliminar Cliente:', error)

    })


  }
}
