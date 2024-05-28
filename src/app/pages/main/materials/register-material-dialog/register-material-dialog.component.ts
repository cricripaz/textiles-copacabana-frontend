import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MaterialApiService} from "../../../../services/material-api.service";

@Component({
  selector: 'app-register-material-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-material-dialog.component.html',
  styleUrl: './register-material-dialog.component.scss'
})
export class RegisterMaterialDialogComponent implements OnInit{

  DataMaterialForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    private toastr : ToastrService,
    private materialService : MaterialApiService,
    private matdialog : MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }


  private initializeForm() {
    this.DataMaterialForm = this.fb.group({
         name: ['', Validators.required],
         description : ['']
    })
  }
  registerMaterial() {
    if(this.DataMaterialForm.valid){
      this.materialService.createMaterial(this.DataMaterialForm.value).subscribe(
        (res: any) => {
          this.toastr.success('Material Agregado Exitosamente')
          this.matdialog.closeAll()


        }, () => {
          this.toastr.error('Error')
        }
      )
    }else{
      this.toastr.error('Por favor llena Todos los campos')
    }
  }

}
