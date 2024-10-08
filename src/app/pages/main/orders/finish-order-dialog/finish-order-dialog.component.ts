import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {OrdersApiService} from "../../../../services/orders-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-finish-order-dialog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './finish-order-dialog.component.html',
  styleUrl: './finish-order-dialog.component.scss'
})
export class FinishOrderDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService : OrdersApiService,
    private dialogRef : MatDialogRef<FinishOrderDialogComponent>,
    private toastrService : ToastrService
  ) {
  }
  ngOnInit(): void {
    console.log(this.data)
  }

  finishOrder() {
    const id  = this.data.order_id;
    this.orderService.finishOrder(id).subscribe((res) => {
      console.log(res)
      this.toastrService.success("Orden Finalizada Exitosamente")
      this.dialogRef.close('yes')

    })

  }


}
