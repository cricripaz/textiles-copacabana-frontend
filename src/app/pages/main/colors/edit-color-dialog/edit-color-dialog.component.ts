import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ColorApiService} from "../../../../services/color-api.service";


@Component({
  selector: 'app-edit-color-dialog',
  standalone: true,
    imports: [
        MatDialogModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-color-dialog.component.html',
  styleUrl: './edit-color-dialog.component.scss'
})
export class EditColorDialogComponent implements OnInit{
  EditDataColorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public colorDataInject: any,
    private colorService: ColorApiService,
    private toastr: ToastrService,
    private matdialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.colorDataInject);
  }

  private initializeForm() {
    this.EditDataColorForm = this.fb.group({
      name: [this.colorDataInject.name],
      description: ['']
    });
  }

  editColor() {
    console.log('click')
    const id = this.colorDataInject.color_id;
    const formdata = this.EditDataColorForm.value;

    console.log('data send: ', id);

    this.colorService.editColor(id, formdata).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Color Actualizado Exitosamente.', 'Éxito');
        this.matdialog.closeAll();
        // TODO update al array investigars
      },
      (error) => {
        this.toastr.error(error, 'Error');
      }
    );
  }
}
