import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerApiService} from "../../../../services/customer-api.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})


export class RegisterDialogComponent implements OnInit{

  DataInventoryForm!: FormGroup;

  constructor(

    private fb : FormBuilder,
    private toastr : ToastrService,
    private customerService : CustomerApiService,
    private matdialog : MatDialog
  ) {
  }



  ngOnInit(): void {
    this.initializeForm()
  }


  private initializeForm(){
    this.DataInventoryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      NIT: ['', Validators.required],
      notes: [''],
    })
  }



  registerCustomer(){
    console.log(this.DataInventoryForm.value)
    if(this.DataInventoryForm.valid){
      this.customerService.createCustomer(this.DataInventoryForm.value).subscribe(
        (res: any) => {
             this.toastr.success('Cliente Agregado Exitosamente')
             this.matdialog.closeAll()
          //TODO UPDATE data parent

        }, () => {
          this.toastr.error('Error')
        }
      )
    }else{
      this.toastr.error('Por favor llena Todos los campos')
    }

  }





}
