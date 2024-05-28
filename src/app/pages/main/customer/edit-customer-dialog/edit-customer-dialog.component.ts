import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CustomerApiService} from "../../../../services/customer-api.service";

@Component({
  selector: 'app-edit-customer-dialog',
  standalone: true,
    imports: [
        MatDialogModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-customer-dialog.component.html',
  styleUrl: './edit-customer-dialog.component.scss'
})
export class EditCustomerDialogComponent {


  editCustomerForm! : FormGroup




  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public customerDataInject: any,
    private customerService : CustomerApiService,
    private toastr : ToastrService,
    private matdialog : MatDialog
  ) {

  }

  ngOnInit(): void {

    this.initializeForm();

  }

  private initializeForm() {

    this.editCustomerForm = this.fb.group({
      name:[this.customerDataInject.name,[]],
      type:[this.customerDataInject.type],
      address:[this.customerDataInject.address,[]],
      city:[this.customerDataInject.city,[]],
      phoneNumber:[this.customerDataInject.phoneNumber,[]],
      email:[this.customerDataInject.email,[]],
      NIT:[this.customerDataInject.NIT,[]],
      notes:[this.customerDataInject.notes,[]]
    })

  }

  editCustomer() {

    const id = this.customerDataInject.customer_id ;
    const formData = this.editCustomerForm.value;

    this.customerService.editCustomer(id,formData)
      .subscribe(
        () => {
          this.toastr.success('Cliente Actualizado Exitosamente.', 'Éxito'); // Muestra el toastr de éxito
          this.matdialog.closeAll()
          //TODO update al array investigars
        },
        error => {
          this.toastr.error( error, 'Error'); // Muestra el toastr de error si ocurrió un error
        }
      );

  }


}
