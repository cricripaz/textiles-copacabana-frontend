import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MaterialApiService} from "../../../../services/material-api.service";
import {ColorApiService} from "../../../../services/color-api.service";

@Component({
  selector: 'app-register-color-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-color-dialog.component.html',
  styleUrl: './register-color-dialog.component.scss'
})
export class RegisterColorDialogComponent implements OnInit{
  DataColorForm!: FormGroup;


  constructor(
    private fb : FormBuilder,
    private toastr : ToastrService,
    private colorService : ColorApiService,
    private matdialog : MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
    }

  private initializeForm() {

    this.DataColorForm = this.fb.group( {
      name: ['', Validators.required],
      description : ['']
    })

  }

  registerColor() {

    if(this.DataColorForm.valid){
      this.colorService.createColor(this.DataColorForm.value).subscribe(
        (res: any) => {
          this.toastr.success('Color Agregado Exitosamente')
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
